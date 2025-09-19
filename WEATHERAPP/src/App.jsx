import { useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    return `${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;
  };

  const search = (e) => {
    if (e.key === "Enter") {
      setInput("");
      setWeather({ ...weather, loading: true });

      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: input,
            units: "metric",
            appid: "366f893d41b6387799d35436ea94cdeb", // ⚠️ replace with your own key
          },
        })
        .then((res) => {
          setWeather({ loading: false, data: res.data, error: false });
        })
        .catch(() => {
          setWeather({ ...weather, data: {}, error: true });
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center justify-center py-4">
          Weather App
        </h2>
        {/* Input */}''
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Loader */}
        {weather.loading && (
          <div className="flex justify-center">
            <Oval height={40} width={40} color="#fff" />
          </div>
        )}

        {/* Error */}
        {weather.error && (
          <div className="text-center text-red-300 font-semibold">
            City Not Found 🚫
          </div>
        )}

        {/* Weather Data */}
        {weather && weather.data && weather.data.main && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">
              {weather.data.name},{" "}
              <span className="font-light">{weather.data.sys.country}</span>
            </h2>

            <p className="text-sm text-white/80">{toDate()}</p>

            <div className="flex flex-col items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt="weather-icon"
                className="w-20 h-20"
              />
              <p className="text-5xl font-extrabold">
                {Math.round(weather.data.main.temp)}
                <sup>°C</sup>
              </p>
            </div>

            <div>
              <p className="capitalize text-lg">
                {weather.data.weather[0].description}
              </p>
              <p className="text-sm">
                💨 Wind Speed: {weather.data.wind.speed} m/s
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
