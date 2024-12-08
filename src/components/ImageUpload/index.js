import React, { useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Upload } from 'react-bootstrap-icons';

const ImageUpload = ({ sendAlert, fetchImages }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Trigger the hidden file input when the button is clicked
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden input
    }
  };

  // Handle file selection and automatic submission
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', file); // Add the file to FormData

    try {
      setUploading(true);

      // Upload the file
      const response = await fetch('api/v1/images', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        sendAlert('File uploaded successfully', true);
      } else {
        sendAlert(`Failed to upload image: ${data.error}`, false);
      }
      
    } catch (error) {
      sendAlert(`Failed to upload image: ${error}`, false);
    } finally {
      fetchImages();
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <Form>
        {/* Hidden File Input */}
        <Form.Control
          type="file"
          accept="image/*"
          ref={fileInputRef} // Attach the ref
          onChange={handleFileChange} // Trigger upload when a file is selected
          style={{ display: 'none' }} // Hide the default input
        />
        {/* Visible Button to Trigger File Input */}
        <Button
          onClick={handleButtonClick}
          variant="success"
          disabled={uploading}>
          {uploading ? <Spinner animation="border" size="sm" /> : <Upload />}
        </Button>
      </Form>
    </div>
  );
};

export default ImageUpload;