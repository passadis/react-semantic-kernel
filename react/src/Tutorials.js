import React, { useState } from 'react';

function Tutorials() {
    const [response, setResponse] = useState(null);  // Define a state variable to hold the response

    async function handleEngageClick(prompt) {
        const data = await sendEngageRequest(prompt);
        setResponse(data.response);  // Update the state variable with the response
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL ||  'http://backend-service:5000';  // Default to localhost:5000 if REACT_APP_BACKEND_URL is not defined
    
    async function sendEngageRequest(prompt) {
        // eslint-disable-next-line no-template-curly-in-string
        const response = await fetch(`${backendUrl}/engage?`, {
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


/*function Tutorials() { */
    return (
        <div className="tutorials">
            <h1>Tutorials</h1>
            <ul className="tutorial-list">
                <li>
                    <a 
                        href="#tutorial1" 
                        className="tutorial-link"
                        onClick={() => handleEngageClick('Write 50 words on Introduction to Algebra')}
                    >
                        Tutorial 1: Introduction to Algebra
                    </a>
                </li>
                <li>
                    <a 
                        href="#tutorial2" 
                        className="tutorial-link"
                        onClick={() => handleEngageClick('Write the Basics of Geometry')}
                    >
                        Tutorial 2: Basics of Geometry
                    </a>
                </li>
                <li>
                    <a 
                        href="#tutorial3" 
                        className="tutorial-link"
                        onClick={() => handleEngageClick('Write the fundamentals of Calculus')}
                    >
                        Tutorial 3: Fundamentals of Calculus
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


export default Tutorials;
