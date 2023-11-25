import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const API_KEY = "cb10b8fe0eec572a9b5c29e91a2501ea"; 
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        })
        setResult(data);
        console.log(data);
      } 
      catch(err) {
        alert(err);
      }
    }
  }

  return (
    <div className="App">
      <div className="AppWrap">
        <input
          placeholder="도시를 입력하세요"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          onKeyDown={searchWeather}
        />
        {
          Object.keys(result).length !== 0 && (
            <div className="ResultWrap">
              <div className="city">{result.data.name}</div>
              <div className="temperature">{Math.round((result.data.main.temp - 273.15) * 10) / 10}°C</div>
              <div className="sky">{result.data.weather[0].main}</div>
            </div>
          )}
      </div>
    </div>
  );
}

export default App;