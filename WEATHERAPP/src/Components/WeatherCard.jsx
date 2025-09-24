import React from "react";

const WeatherCard = ({ weather, toDate }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Left Side - All Details */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">
          {weather.data.name},{" "}
          <span className="font-light">{weather.data.sys.country}</span>
        </h2>
        <p className="text-sm text-white/70 mb-2">{toDate()}</p>
        <p className="capitalize text-lg text-white/90">
          {weather.data.weather[0].description}
        </p>
      </div>

      {/* Right Side - Icon and Temperature */}
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
          alt="weather-icon"
          className="w-20 h-24 drop-shadow-lg"
        />
        <p className="text-6xl font-extrabold">
          {Math.round(weather.data.main.temp)}
          <sup>°C</sup>
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
