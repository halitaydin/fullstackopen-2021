import { React, useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    request: {},
    location: {},
    current: {},
    forecast: {},
    temperature: {},
  });

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
      units: "m",
    };
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        setWeather(response.data);
      });
  }, [country]);
  return (
    <div>
      <h3>
        <b>Weather in {country.capital}</b>
      </h3>
      <h4>
        <p>
          <b>Temperature:{weather.current.temperature} Celcius</b>
        </p>
        <img src={weather.current.weather_icons} alt={"weather_icon"}></img>
        <p>{weather.current.weather_descriptions}</p>
        <p>
          <b>
            Wind:{weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </b>
        </p>
      </h4>
    </div>
  );
};

export default Weather;
