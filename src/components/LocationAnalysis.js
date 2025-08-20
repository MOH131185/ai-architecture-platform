import React, { useState, useEffect } from 'react';

const LocationAnalysis = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [architecturalStyle, setArchitecturalStyle] = useState('Fetching...');
  const [streetViewUrl, setStreetViewUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;

    // Reset states on new address
    setError(null);
    setCoordinates(null);
    setWeather(null);
    setArchitecturalStyle('Fetching...');
    setStreetViewUrl('');

    const runAnalysis = async () => {
      try {
        // Step 1: Geocoding
        const coords = await geocodeAddress();
        if (coords) {
          // Step 2: Fetch Weather
          fetchWeatherData(coords.lat, coords.lon);
          // Step 3: Detect Architectural Style
          fetchArchitecturalStyle(coords.lat, coords.lon);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    const geocodeAddress = async () => {
      const apiKey = process.env.REACT_APP_GEOCODING_API_KEY;
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        throw new Error("Geocoding API key is not configured.");
      }
      const response = await fetch(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${apiKey}`);
      if (!response.ok) throw new Error(`Geocoding failed: ${response.statusText}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat, lon });
        return { lat, lon };
      } else {
        throw new Error("Could not find coordinates for the address.");
      }
    };

    const fetchWeatherData = async (lat, lon) => {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        setError(prev => prev ? `${prev} | Weather API key not configured.` : "Weather API key not configured.");
        return;
      }
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
        if (!response.ok) throw new Error(`Weather fetch failed: ${response.statusText}`);
        const data = await response.json();
        setWeather(data);
      } catch(err) {
         setError(prev => prev ? `${prev} | ${err.message}` : err.message);
      }
    };

    const fetchArchitecturalStyle = async (lat, lon) => {
      try {
        // Part A: Get Street View Image URL
        const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        if (!googleApiKey || googleApiKey === 'YOUR_API_KEY_HERE') {
          throw new Error("Google Maps API key not configured.");
        }
        const imageUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lon}&key=${googleApiKey}`;
        setStreetViewUrl(imageUrl);

        // Part B: Get Nyckel Access Token
        const clientId = process.env.REACT_APP_NYCKEL_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_NYCKEL_CLIENT_SECRET;
        if (!clientId || clientId === 'YOUR_CLIENT_ID_HERE' || !clientSecret || clientSecret === 'YOUR_CLIENT_SECRET_HERE') {
          throw new Error("Nyckel credentials are not configured.");
        }

        const tokenResponse = await fetch('https://www.nyckel.com/connect/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
        });
        if (!tokenResponse.ok) throw new Error(`Nyckel auth failed: ${tokenResponse.statusText}`);
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Part C: Invoke Nyckel Function
        const functionId = process.env.REACT_APP_NYCKEL_FUNCTION_ID;
        if (!functionId || functionId === 'YOUR_FUNCTION_ID_HERE') {
          throw new Error("Nyckel Function ID is not configured.");
        }

        const invokeResponse = await fetch(`https://www.nyckel.com/v1/functions/${functionId}/invoke`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: imageUrl })
        });

        if (!invokeResponse.ok) throw new Error(`Nyckel invoke failed: ${invokeResponse.statusText}`);
        const invokeData = await invokeResponse.json();
        setArchitecturalStyle(`${invokeData.labelName} (Confidence: ${Math.round(invokeData.confidence * 100)}%)`);

      } catch (err) {
        setArchitecturalStyle('Unavailable');
        setError(prev => prev ? `${prev} | ${err.message}` : err.message);
      }
    };

    runAnalysis();

  }, [address]);

  return (
    <div>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Step 2: Location Analysis</h2>
        <p><strong>Address:</strong> {address}</p>

        {error && <p style={{color: 'red'}}><strong>Error:</strong> {error}</p>}

        {coordinates ? (
          <p><strong>Coordinates:</strong> {coordinates.lat}, {coordinates.lon}</p>
        ) : (
          !error && <p>Fetching coordinates...</p>
        )}

        {weather ? (
          <div>
            <p><strong>Climate:</strong> {weather.current.condition.text}</p>
            <p><strong>Temperature:</strong> {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
          </div>
        ) : (
          !error && <p>Fetching weather data...</p>
        )}

        {streetViewUrl && !error && (
          <div>
            <p><strong>Street View Image:</strong></p>
            <img src={streetViewUrl} alt="Street View" style={{maxWidth: '100%', borderRadius: '8px'}} />
          </div>
        )}

        <p><strong>Detected Architectural Style:</strong> {architecturalStyle}</p>

      </div>
    </div>
  );
};

export default LocationAnalysis;
