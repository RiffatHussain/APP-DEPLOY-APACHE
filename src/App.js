import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Container, Toast } from 'react-bootstrap';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files to the list
  };

  const handleRemove = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName)); // Remove selected file
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    const text = document.querySelector('.char-by-char');
    const textContent = text.innerText;
    text.innerHTML = '';
    textContent.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char; // Handle spaces
      span.style.animationDelay = `${index * 0.05}s`; // Adjust delay for speed
      text.appendChild(span);
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'pink', minHeight: '100vh' }}>
      <nav className="navbar navbar-light" style={{ backgroundColor: 'white' }}>
        <span id="toggle-icon" className="navbar-toggler-icon ms-4" onClick={toggleSidebar}></span>
        <button className="btn btn-primary me-4"><Link to="/login" className='text-decoration-none text-white'>Login</Link></button>
      </nav>
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="list-unstyled">
          <li>About</li>
          <li>Home</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <Container fluid="sm" className="py-5">
        <div className="main-text char-by-char fw-bold text-black">
          Start by uploading your PDF file to our platform. Once uploaded, you can ask any questions, and our AI will instantly generate answers based solely on the content of your file. It's that simple --- upload, ask, and get the information you need in seconds!
        </div>
        <div className="upload-instruction text-muted">
          Upload your PDF files below. Maximum total size: 1MB
        </div>

        {/* File List Above Drag-and-Drop */}
        {files.length > 0 && (
          <div
            className="toast-container mt-3 position-relative mb-3"
            style={{ maxWidth: '100%', zIndex: 10 }}
          >
            <div className="toast-indicator" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid grey' }}></div>
            <Toast className="p-3 shadow bg-dark text-white" style={{ border: '1px solid grey' }}>
              <Toast.Header>
                <strong className="me-auto">Uploaded Files</strong>
              </Toast.Header>
              <Toast.Body>
                <ul className="list-unstyled">
                  {files.map((file, index) => (
                    <li key={index} className="d-flex justify-content-between align-items-center mb-2">
                      {file.name} - {file.size} bytes
                      <button
                        className="btn-close bg-light"
                        aria-label="Remove"
                        onClick={() => handleRemove(file.name)}
                      ></button>
                    </li>
                  ))}
                </ul>
              </Toast.Body>
            </Toast>
          </div>
        )}

        {/* Drag and Drop Area */}
        <div className="border-box p-3 my-3" style={{ border: '2px dashed grey', textAlign: 'center', backgroundColor: 'white' }}>
          <div {...getRootProps()} className="drag-drop text-muted" style={{ padding: '20px' }}>
            <input {...getInputProps()} />
            {files.length === 0 ? (
              <p>Drag and Drop PDF Files here or <button className="btn btn-link text-primary" onClick={() => document.querySelector('input').click()}>Browse Files</button></p>
            ) : (
              <p>Drag and drop to add more files.</p>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className='d-flex justify-content-center'>
          <button className="btn btn-success mt-3">
            Upload
          </button>
        </div>
      </Container>
    </div>
  );
};

export default App;
