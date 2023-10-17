import React, { useState } from 'react';

function Quizzes() {
    const [response, setResponse] = useState(null);  // Define a state variable to hold the response

    async function handleEngageClick(prompt) {
        const data = await sendEngageRequest(prompt);
        setResponse(data.response);  // Update the state variable with the response
    }
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL ||  'http://backend10:5000';  // Default to localhost:5000 if REACT_APP_BACKEND_URL is not defined

    async function sendEngageRequest(prompt) {
        const response = await fetch(`${backendUrl}/engage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: prompt }),
        });

        if (response.ok) {
            return await response.json();  // Return the response data
        } else {
            console.error('Failed to engage:', response.statusText);
            return null;  // Return null on failure
        }
    }

    return (
        <div className="quizzes">
            <h1>Quizzes</h1>
            <ul className="quizzes-list">
                <li>
                    <a 
                        href="#quiz1" 
                        className="quizzes-link"
                        onClick={() => handleEngageClick('Create a small quiz on Algebra, with 3 questions.')}
                    >
                        Quiz 1: Algebra
                    </a>
                </li>
                <li>
                    <a 
                        href="#quiz2" 
                        className="quizzes-link"
                        onClick={() => handleEngageClick('Create a small quiz on Geometry')}
                    >
                        Quiz 2: Geometry
                    </a>
                </li>
                <li>
                    <a 
                        href="#quiz3" 
                        className="quizzes-link"
                        onClick={() => handleEngageClick('Create a small quiz on Calculus')}
                    >
                        Quiz 3: Calculus
                    </a>
                </li>
            </ul>
            {response && (
            <div className="response">
                <h2>Response:</h2>
                <pre>{response}</pre>
            </div>
        )}
        </div>
    );
}


export default Quizzes


/*function Quizzes() {
    return (
        <div className="quizzes">
            <h1>Quizzes</h1>
            <ul className="quizzes-list">
    <li><a href="#quiz1" className="quizzes-link">Quiz 1: Algebra Basics</a></li>
    <li><a href="#quiz2" className="quizzes-link">Quiz 2: Geometry Fundamentals</a></li>
    <li><a href="#quiz3" className="quizzes-link">Quiz 3: Calculus Concepts</a></li>
</ul>
        </div>
    );
}

export default Quizzes; */
