import { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import SearchBar from "./Components/SearchBar";
import WeatherCard from "./Components/WeatherCard";
import WeatherDetails from "./Components/WeatherDetails";
import DailyForecast from "./Components/DailyForecast";
import HourlyForecast from "./Components/HourlyForecast";

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

  // Function to fetch weather for any city
  const fetchWeather = (cityName) => {
    setWeather({ ...weather, loading: true });

    const currentWeatherCall = axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: cityName,
          units: "metric",
          appid: "366f893d41b6387799d35436ea94cdeb",
        },
      }
    );

    const forecastCall = axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: cityName,
          units: "metric",
          appid: "366f893d41b6387799d35436ea94cdeb",
        },
      }
    );

    Promise.all([currentWeatherCall, forecastCall])
      .then(([currentRes, forecastRes]) => {
        setWeather({
          loading: false,
          data: {
            ...currentRes.data,
            forecast: forecastRes.data.list,
          },
          error: false,
        });
      })
      .catch(() => {
        setWeather({ loading: false, data: {}, error: true });
      });
  };

  // Default City
  useEffect(() => {
    fetchWeather("Fajara");
  }, []);

  const search = (e) => {
    if (e && e.key && e.key !== "Enter") return;
    if (!input.trim()) return;

    const cityToSearch = input;
    setInput("");
    fetchWeather(cityToSearch);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6 relative">
      {/* Weather Icon - Top Left */}
      <div className="absolute top-4 left-4 ">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-3xl text-white font-bold">Weather Now</h1>
        </div>
      </div>

      <h2 className="text-2xl text-white font-bold flex items-center justify-center py-4 mb-4 mt-10 sm:mt-6">
        How's the sky looking today?
      </h2>

      {/* Input */}
      <SearchBar input={input} setInput={setInput} onSearch={search} />

      <div>
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
        {weather?.data?.main && (
          <div className="flex flex-col lg:flex-row gap-6 justify-center mt-10 max-w-7xl mx-auto">
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg text-white p-7">
                <WeatherCard weather={weather} toDate={toDate} />
              </div>

              <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg text-white p-7">
                <WeatherDetails weather={weather} />
              </div>

              <div>
                <h2 className="text-white text-xl font-bold text-left mb-6">
                  Day Forecast
                </h2>
                <DailyForecast weather={weather} />
              </div>
            </div>

            <div className="flex-1 lg:max-w-md">
              <HourlyForecast weather={weather} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 text-center text-white/80">Made with ❤️</div>
    </div>
  );
}

export default App;
