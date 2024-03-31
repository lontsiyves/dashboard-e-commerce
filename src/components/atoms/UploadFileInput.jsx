import React from 'react'

export default function UploadFileInput({ onChange }) {
    const handleFileChange = (event) => {
        const file = event?.target?.files[0];

        onChange(file);
      };
    
      return (
        <input type="file" name='image' id='image' onChange={handleFileChange} />
      );
}
