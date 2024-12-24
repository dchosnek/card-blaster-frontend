import React from 'react';
import { Navbar as BootstrapNavbar, Container, Dropdown } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import './Navbar.css'; 

function Navbar({ isAuthenticated, avatarUrl, nickName, setShowRecentActivity, setShowUploadedImages, handleLoginClick, setShowBotForm, botMode }) {

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
    // when user clicks "Uploaded Images" set the show state to true for the image list modal
    const handleUploadedImagesClick = () => setShowUploadedImages(true);
    // when user clicks "Bot mode" set the show state to true for the bot form
    const handleBotModeClick = () => setShowBotForm(true);

    return (
        <Container>
            <BootstrapNavbar bg="dark" variant="dark" className="mt-1 rounded px-4 d-flex justify-content-between align-items-center">
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
                            <Dropdown.Item onClick={handleRecentActivityClick}>Sent Cards</Dropdown.Item>
                            <Dropdown.Item onClick={handleUploadedImagesClick}>Uploaded Images</Dropdown.Item>
                            <Dropdown.Item onClick={handleBotModeClick} hidden={botMode}>Bot mode</Dropdown.Item>
                            <Dropdown.Item onClick={handleLoginClick} hidden={!botMode}>Human mode</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Dropdown align="end">
                        <Dropdown.Toggle as="div" style={{ cursor: 'pointer' }}>
                            <PersonFill 
                                color="white"
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                className="avatar"
                            />
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