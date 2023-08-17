import React, { useState, useEffect } from "react";
import WeatherBox from './components/WeatherBox';
import WeatherButton from './components/WeatherButton.js';
import './App.css';
import './reset.css';
import PacmanLoader from "react-spinners/PacmanLoader";
import { ClipLoader } from "react-spinners";
const cities = ["Seoul", "Jeju", "Daegu", "Busan", "Yeosu", "Chuncheon"];

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨 화씨 날씨상태가 보인다
// 3. 5개의 버튼이 있다 한개의버튼은 현재날씨 4개는 다른도시의 버튼
// 4. 도시 버튼을 클릴할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 불러오는 동안 로딩스피너가 돌아간다

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState("");
  
  const getWeatherByCurrentLocation = async (lat,lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5800d977d285b7ba998e8f1551089df9`;
      let response = await fetch(url);
      let data = await response.json();
      console.log('data', data);
      setWeather(data);
      setLoading(false);
    } catch (err){
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { lat, lon } = position.coords;
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  
  
  const getWeatherByCity = async () =>{
    try{
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5800d977d285b7ba998e8f1551089df9`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    }catch (err){
      console.log(err.message);
      setLoading(false);
    }
  };


  useEffect(() => { 
    if(city === "null") {
      setLoading(true);
      getCurrentLocation();
    }else{
      setLoading(true);
      getWeatherByCity();
    }
  },[city]);
  

  const handleCityChange = (city) =>{
    if (city === "current") {
      setCity(null);
    }else{setCity(city)}
  };
  return(
    <>
      <div className='wrap'>
      <PacmanLoader color="#ffee00" size={30} className='pacman'/>
      <div className='main_container'>

        <WeatherBox weather={weather} />
        <WeatherButton
        cities={cities} 
        handleCityChange={handleCityChange}
        selectedCity={city}/>
      </div>
    </div>
    </>
  );
};
export default App;
