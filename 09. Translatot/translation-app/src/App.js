import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dutchText, setDutchText] = useState('Hallo Chris');
  const [englishText, setEnglishText] = useState('<english>');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/translate', { input: dutchText });
      setEnglishText(response.data.translatedText);

      const speechResponse = await axios.post('/api/speech', { text: response.data.translatedText });
      const audioBlob = new Blob([speechResponse.data], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error translating or generating speech:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Dutch Text:
            <input
              type="text"
              value={dutchText}
              onChange={(e) => setDutchText(e.target.value)}
            />
          </label>
          <button type="submit">Translate</button>
        </form>
        <div>
          <h3>English Translation:</h3>
          <p>{englishText}</p>
          {audioUrl && (
            <div>
              <h3>Generated Speech:</h3>
              <audio controls src={audioUrl} />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
