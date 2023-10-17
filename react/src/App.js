import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Tutorials from './Tutorials';
import Quizzes from './Quizzes';
import Profile from './Profile';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);

  const fetchResponse = async (prompt) => {
    const res = await fetch('/engage?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({ user_input: prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  };
  return (
    <div className="App">
      <Navbar />
      <Home />
      <div className="content-sections">
        <Tutorials fetchResponse={fetchResponse} response={response} />
        <Quizzes fetchResponse={fetchResponse} response={response} />
        <div className="profile-container">
          <Profile fetchResponse={fetchResponse} response={response} />
        </div>
      </div>
      {/* Other components will go here */}
    </div>
  );
}

export default App;
