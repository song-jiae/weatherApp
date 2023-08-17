import React from 'react'

const WeatherBox = ({weather}) =>{
  const temperatureC =
  weather && weather.main ? (weather.main.temp).toFixed(2) :"";
  const temperatureF =
  weather && weather.main ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2) : "";
  return (
    <>
    <div className='weater_box'>
      <h2>{weather?.name || '날씨를 가져오는데 실패함'}</h2> 
      <h3>{`${temperatureC} °C`}</h3>
      <h3>{`${temperatureF} °F`}</h3>
      <h4>{weather && weather.description}</h4>
    </div>
    </>
  );
};

export default WeatherBox;