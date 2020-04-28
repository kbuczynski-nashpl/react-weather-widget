import React from 'react';
import WeatherWidget from './components/weather-widget/weather-widget';
import './App.scss';

function App() {
  return (<WeatherWidget units="metric" city="London"></WeatherWidget>);
}

export default App;
