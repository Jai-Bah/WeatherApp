import React, { useState } from "react";

const HourlyForecast = ({ weather }) => {
  
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  console.log(currentDay);

  const [selectedDay, setSelectedDay] = useState(currentDay);

  if (!weather?.data?.forecast) {
    return <div>No forecast data available</div>;
  }

  const getHourlyForecastByDay = () => {
    const forecast = weather.data.forecast;

    const groupByDay = {};

    forecast.forEach((item) => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(item.dt * 1000);

      const day = days[date.getDay()];

      if (!groupByDay[day]) {
        groupByDay[day] = [];
      }

      groupByDay[day].push(item);
    });

    return groupByDay;
  };

  const availableDays = Object.keys(getHourlyForecastByDay());

  const allHourlyData = getHourlyForecastByDay();
  const selectedDayHours = selectedDay ? allHourlyData[selectedDay] : [];

  return (
    <div className="text-white p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Hourly Forecast</h2>
        <select
          name="days"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <option
            value=""
            disabled
            className="bg-[lavender] backdrop-blur-md text-gray-800"
            style={{
              backgroundColor: "rgba(42, 42, 239, 0.7)",
              backdropFilter: "blur(6px)",
            }}
          >
            Select a day
          </option>
          {availableDays.map((day) => (
            <option
              value={day}
              key={day}
              className="bg-[lavender] backdrop-blur-md text-gray-800 hover:bg-[rgba(76, 76, 200, 0.9)]"
              style={{
                backgroundColor: "rgba(42, 42, 239, 0.7)",
                backdropFilter: "blur(6px)",
              }}
            >
              {day}
            </option>
          ))}
        </select>
      </div>

      {selectedDay && selectedDayHours.length > 0 && (
        <div className="space-y-3">
          {selectedDayHours.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white/15 backdrop-blur-md rounded-xl p-4 shadow-md hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="w-12 h-12"
                />
                <div>
                  <div className="text-sm font-medium">
                    {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                  </div>
                  <div className="text-xs text-white/80 capitalize">
                    {item.weather[0].description}
                  </div>
                </div>
              </div>

              <div className="text-2xl font-bold">
                {Math.round(item.main.temp)}°C
              </div>
            </div>
          ))}
        </div>
      )}

      {!selectedDay && (
        <div className="text-center text-white/70 py-8">
          <p>Select a day to view hourly forecast</p>
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
