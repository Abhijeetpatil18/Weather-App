import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

import { FaTemperatureHigh } from "react-icons/fa6";

import sunCloudIcon from "../assets/sun-with-cloud-in-flat-icon-weather-app-forecast-summer-climate-free-vector.jpg";

function Card() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    cityName: "",
    temp: "0",
    humidity: "0",
    windSpeed: "0",
  });

  const search = async (cityName) => {
    if (cityName == "") return;
    const apiKey = import.meta.env.VITE_APP_ID;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        cityName: data.name,
        temp: data.main?.temp,
        humidity: data.main?.humidity,
        windSpeed: data.wind.speed,
      });
      console.log(data);
    } catch (error) {
      alert("Enter correct city name");
      setWeatherData({ temp: "N/A", humidity: "N/A" });
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const cityName = useRef("");

  const getCity = () => {
    const value = cityName.current.value;
    if (value) {
      setCity(value);
      cityName.current.value = "";
    }
  };
  return (
    <div className=" bg-white text-black w-96 h-115 mt-15 p-3 rounded-[25px]">
      <div className="card-body">
        <div
          className="rounded-[10px] py-2 px-1 w-55 ml-10 border border-gray-500
"
        >
          <div className="flex justify-between w-50 gap-5 ">
            <div>
              <input
                type="text"
                className="  focus:outline-0"
                placeholder="Enter the item name"
                ref={cityName}
              />
            </div>
            <div className="items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
                onClick={getCity}
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <img
          src={sunCloudIcon}
          alt="Weather icon"
          className="size-40 mx-19 mt-5 border-0"
        />
        <div>
          <p className="text-2xl font-serif">{weatherData.cityName}</p>
          <p className="my-3 text-xl ">{weatherData.temp}°C</p>
        </div>

        <div className="card-actions flex justify-evenly text-xl">
          <p>
            <WiHumidity className="size-6" />
            {weatherData.humidity} %
            <p className="text-[17px] italic">Humidity</p>
          </p>
          <p>
            <FaWind className="size-5 mb-1" />
            {weatherData.windSpeed} km/hr
            <p className="text-[17px] italic">Wind speed</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
