import React from 'react';

const Header = ({ title }) => {
    return (
        <header style={headerStyle}>
            <h1>{title}</h1>
        </header>
    );
};

const headerStyle = {
    position: 'fixed', // Fixed position
    top: 0,            // Stick to the top
    width: '100%',     // Full width
    backgroundColor: '#7bd4b6', // Background color
    padding: '10px 0', // Padding for aesthetic spacing
    textAlign: 'center', // Center the title
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Optional shadow for better UI
};

export default Header;
