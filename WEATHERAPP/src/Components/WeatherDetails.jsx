import React from "react";

const WeatherDetails = ({ weather }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div className="bg-white/10 p-6 rounded-xl shadow-md text-center min-h-[120px] flex flex-col justify-center">
        <h2 className="font-semibold text-sm text-white/80 mb-4">Feels Like</h2>
        <p className="text-lg font-bold">
          {Math.round(weather.data.main.feels_like)} °C
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-xl shadow-md text-center min-h-[120px] flex flex-col justify-center">
        <h2 className="font-semibold text-sm text-white/80 mb-4">Humidity</h2>
        <p className="text-lg font-bold">{weather.data.main.humidity} %</p>
      </div>

      <div className="bg-white/10 p-6 rounded-xl shadow-md text-center min-h-[120px] flex flex-col justify-center">
        <h2 className="font-semibold text-sm text-white/80 mb-4">Wind</h2>
        <p className="text-lg font-bold">{weather.data.wind.speed} m/s</p>
      </div>

      <div className="bg-white/10 p-6 rounded-xl shadow-md text-center min-h-[120px] flex flex-col justify-center">
        <h2 className="font-semibold text-sm text-white/80 mb-4">Pressure</h2>
        <p className="text-lg font-bold">{weather.data.main.pressure} hPa</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
