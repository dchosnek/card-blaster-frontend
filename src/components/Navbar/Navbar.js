import React from 'react';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import './Navbar.css'; // Import the custom CSS file for styling

function Navbar({ avatarUrl }) {
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
                <img
                    src={ avatarUrl }
                    alt="User Avatar"
                    className="avatar"
                />
            </BootstrapNavbar>
        </Container>
    );
}

export default Navbar;