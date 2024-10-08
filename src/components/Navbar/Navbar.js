import React from 'react';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import './Navbar.css'; // Import the custom CSS file for styling

function Navbar({ isAuthenticated, avatarUrl }) {
    return (
        <Container>
            <BootstrapNavbar bg="dark" variant="dark" className="mt-3 rounded px-4 d-flex justify-content-between align-items-center">
                {/* Left Section: Blaster Icon and Brand Name */}
                <div className="d-flex align-items-center">
                    {/* Blaster Icon */}
                    <img
                        src={`${process.env.PUBLIC_URL}/blaster.png`} // Use the public path to access blaster.png
                        alt="Blaster Icon"
                        className="blaster-icon" // Apply custom styling for the blaster icon
                    />

                    {/* Brand Name */}
                    <BootstrapNavbar.Brand href="#home" className="ms-2"> {/* Add left margin */}
                        Webex Blaster
                    </BootstrapNavbar.Brand>
                </div>

                {/* Right Section: Round Avatar Image */}
                {isAuthenticated ? (
                    <img
                        src={avatarUrl}
                        alt="User Avatar"
                        className="avatar"
                    />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                )}
            </BootstrapNavbar>
        </Container>
    );
}

export default Navbar;