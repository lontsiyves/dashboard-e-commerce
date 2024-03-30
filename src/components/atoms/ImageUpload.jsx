import React, { useState } from "react";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // Here you can perform file upload logic, like sending the file to a server
      console.log("Selected file:", selectedFile);
      // You may want to clear the input after uploading
      setSelectedFile(null);
    }
  };

  return (
    <div>
      <h2>Télécharger l'image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Télécharger</button>
      </form>
      {selectedFile && (
        <div>
          <h3>Image sélectionnée:</h3>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
