import React from 'react'

const WeatherButton = ({cities, handleCityChange}) => {
  console.log("cities?", cities);
  return (
    <>
    <button className='btn' 
      onClick={() => handleCityChange("current")}>
        CurrentLocation
    </button>
    <div className='btn_wrap'>
      {cities.map((city)=>(
        <button onClick={() => handleCityChange(city)}>{city}</button>
      ))}
    </div>
    </>
  );
};

export default WeatherButton