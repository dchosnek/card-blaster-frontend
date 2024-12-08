import React, { useState } from 'react';
import { OverlayTrigger, Tooltip, Button, Toast } from 'react-bootstrap';

// This component creates a small button with an image (Bootstrap icon) in it.
// It has a tooltip that displays when hoving. If popupText is provided, then
// that text will be displayed for a short period after the button is clicked.
const ButtonWithTooltipAndPopup = ({ image, hint, onClick, popupText }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => {
        if (popupText) {
            setShowPopup(true); // Show the popup message
            setTimeout(() => setShowPopup(false), 750); // Hide it after 2 seconds
        }

        if (onClick) {
            onClick(); // Trigger the provided onClick function
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Button with Tooltip */}
            <OverlayTrigger
                overlay={<Tooltip hidden={showPopup}>{hint}</Tooltip>}
                placement="top"
            >
                <Button
                    variant="outline-secondary"
                    className="me-2"
                    onClick={handleClick}
                    size="sm"
                >
                    {image}
                </Button>
            </OverlayTrigger>

            {/* Popup Message */}
            {showPopup && (
                <Toast
                    className='bg-dark text-white'
                    style={{
                        position: 'absolute',
                        top: '50%', // Adjust positioning relative to the button
                        left: '100%',
                        transform: 'translateY(-50%)',
                        whiteSpace: 'nowrap',
                        width: 'auto',      // make width adjust to fit content
                        maxWidth: 'none',   // override default maxWidth: 100% that was truncating text
                    }}
                    onClose={() => setShowPopup(false)}
                >
                    <Toast.Body>{popupText}</Toast.Body>
                </Toast>
            )}
        </div>
    );
};

export default ButtonWithTooltipAndPopup;