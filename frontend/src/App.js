import './App.css';
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [goal, setGoal] = useState('general');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const p = { prompt, goal };
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error('Error:', json);
      setIsLoading(false);
      setError(json.error);
    }
    else {
      console.log('Success:', json);
      setIsLoading(false);
      setError(null);
      setPrompt('');
      if (json.well && json.notWell && json.improvements && json.score && json.prompt && json.prompt && json.goal) {
        setResponse(json);
      }


    }
  }

  return (
    <div className="App app-bg">
      <div className="app-container">
        <h1 className="app-title">Meal Rate App</h1>
        <form onSubmit={handleSubmit} className="app-form">
          <label htmlFor='prompt'>Prompt:</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex. Soup with chicken and carrots, Orange, water"
            className="app-input"
            id="prompt"
          />
          <label htmlFor="goal">Goal:</label>
          <select name='goal' id='goal' value={goal} onChange={e => setGoal(e.target.value)}>
            <option value='general'>General</option>
            <option value='weight'>Weight Loss</option>
            <option value='muscle'>Muscle Gain</option>
          </select>
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
          <div className="app-response">
            <p><b>Prompt:</b> {response.prompt}</p>
            <p><b>Goal:</b> {response.goal}</p>
            <p><b>Good:</b> {response.well}</p>
            <p><b>Bad:</b> {response.notWell}</p>
            <p><b>improvements:</b> {response.improvements}</p>
            <p><b>Score:</b> {response.score} / 10</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;