import React from 'react';
import { Navbar as BootstrapNavbar, Container, Dropdown } from 'react-bootstrap';
import './Navbar.css'; 

function Navbar({ isAuthenticated, avatarUrl, nickName, setShowRecentActivity, handleLoginClick }) {

    const handleLogoutClick = () => {
        // Make a request to the server-side /logout endpoint
        fetch('auth/logout', { credentials: 'include' }) // Include credentials (cookies)
            .then((response) => {
                if (response.redirected) {
                    // If the server responds with a redirect, navigate to that URL
                    window.location.href = response.url;
                }
            })
            .catch((error) => {
                console.error('Logout failed', error);
            });
    };

    // when user clicks "Recent Activity" set the show state to true for the history modal
    const handleRecentActivityClick = () => setShowRecentActivity(true);

    return (
        <Container>
            <BootstrapNavbar bg="dark" variant="dark" className="mt-3 rounded px-4 d-flex justify-content-between align-items-center">
                {/* Left Section: Blaster Icon and Brand Name */}
                <div className="d-flex align-items-center">
                    {/* Blaster Icon */}
                    <img
                        src={`${process.env.PUBLIC_URL}/blaster.png`}
                        alt="Blaster Icon"
                        className="blaster-icon"
                    />

                    {/* Brand Name */}
                    <BootstrapNavbar.Brand href="#home" className="ms-2">
                        Card Blaster for Webex
                    </BootstrapNavbar.Brand>
                </div>

                {/* Right Section: Avatar or SVG with Dropdown Menus */}
                {isAuthenticated ? (
                    <Dropdown align="end">
                        <Dropdown.Toggle as="div" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <span style={{ marginRight: '10px', fontSize: '16px', color: '#fff' }}>Hi, {nickName}</span>
                            <img
                                src={avatarUrl}
                                alt="User Avatar"
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                className="avatar"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleRecentActivityClick}>Recent Activity</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Dropdown align="end">
                        <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                fill="white"
                                className="bi bi-person-circle"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path
                                    fillRule="evenodd"
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                                />
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLoginClick}>Login</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </BootstrapNavbar>
        </Container>
    );
}

export default Navbar;