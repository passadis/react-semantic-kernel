import React from 'react';
import icon from './icon.jpg';  // Import the icon

function Navbar() {
    return (
        <nav className="navbar">
            <img src={icon} alt="App Icon" className="navbar-icon" /> 
            <a href="/">Home</a>
            <a href="/tutorials">Tutorials</a>
            <a href="/quizzes">Quizzes</a>
            <a href="/profile">Profile</a>
        </nav>
    );
}

export default Navbar;
