import React, { useState } from 'react';

const PortfolioUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileObjects = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prevFiles => [...prevFiles, ...fileObjects]);
  };

  return (
    <div>
      <div style={{
        border: '2px dashed #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" style={{
          backgroundColor: '#f8f9fa',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'block'
        }}>
          + Upload Portfolio Images
        </label>
        <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>Upload images of your past work or inspiration.</p>
      </div>

      {files.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '10px'
        }}>
          {files.map((fileObj, index) => (
            <img
              key={index}
              src={fileObj.preview}
              alt="Portfolio preview"
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
              onLoad={() => URL.revokeObjectURL(fileObj.preview)} // Clean up object URLs
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioUpload;
