import React, { useState } from 'react';
import LocationAnalysis from './components/LocationAnalysis';
import PortfolioUpload from './components/PortfolioUpload';
import GeneratingScreen from './components/GeneratingScreen';

function App() {
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (step === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(step + 1);
      }, 3000);
    } else if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(1);
      setAddress('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', color: 'white', margin: '0' }}>
            AI Architecture Platform
          </h1>
          <p style={{ fontSize: '18px', color: 'white', opacity: '0.9' }}>
            Transform addresses into architectural designs
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          textAlign: 'center'
        }}>
          
          {isGenerating ? (
            <GeneratingScreen />
          ) : (
            <>
              {step === 1 && (
                <div>
                  <h2>Step 1: Enter Location</h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address (e.g., New York, NY)"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleNext}
                disabled={!address.trim()}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '15px 30px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: address.trim() ? 1 : 0.5
                }}
              >
                Analyze Location
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <LocationAnalysis address={address} />
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '15px 30px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Continue to Preferences
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Step 3: Design Preferences</h2>
              <PortfolioUpload />
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '15px 30px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                Generate Design
              </button>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2>Step 4: Design Complete!</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <img src="https://picsum.photos/seed/floorplan/400/300" alt="2D Floor Plan" style={{width: '100%', borderRadius: '8px'}} />
                  <h4 style={{marginTop: '10px'}}>2D Floor Plan</h4>
                </div>
                <div>
                  <img src="https://picsum.photos/seed/exterior/400/300" alt="3D Exterior" style={{width: '100%', borderRadius: '8px'}} />
                  <h4 style={{marginTop: '10px'}}>3D Exterior</h4>
                </div>
                <div>
                  <img src="https://picsum.photos/seed/interior/400/300" alt="3D Interior" style={{width: '100%', borderRadius: '8px'}} />
                  <h4 style={{marginTop: '10px'}}>3D Interior</h4>
                </div>
                <div>
                  <img src="https://picsum.photos/seed/siteplan/400/300" alt="Site Plan" style={{width: '100%', borderRadius: '8px'}} />
                  <h4 style={{marginTop: '10px'}}>Site Plan</h4>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                <h4>Specifications:</h4>
                <p>Area: 2,500 sq ft</p>
                <p>Floors: 2</p>
                <p>Rooms: 8</p>
                <p>Cost: $450,000 - $600,000</p>
              </div>
              
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '15px 30px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                New Project
              </button>
            </div>
          )}
            </>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px'
        }}>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: step >= num ? 'white' : 'rgba(255,255,255,0.3)',
                color: step >= num ? '#667eea' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 5px',
                fontWeight: 'bold'
              }}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
