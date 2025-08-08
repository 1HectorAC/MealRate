import './App.css';
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = { prompt };
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    });

    const json = await response.json();

    if(!response.ok) {
      console.error('Error:', json);
      setIsLoading(false);
      setError(json.error);
    }
    else{
      console.log('Success:', json);
      setIsLoading(false);
      setError(null);
      setPrompt('');
      // Assuming the response contains a 'generated_text' field
      if (json.generated_text) {
        setResponse(json.generated_text);
      }
    }
  }

  return (
    <div className="App app-bg">
      <div className="app-container">
        <h1 className="app-title">Test App</h1>
        <form onSubmit={handleSubmit} className="app-form">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type something..."
            className="app-input"
          />
          <button
            type="submit"
            className="app-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        {error && (
          <div className="app-error">{error}</div>
        )}
        {response && (
          <div className="app-response">{response}</div>
        )}
      </div>
    </div>
  );
}

export default App;