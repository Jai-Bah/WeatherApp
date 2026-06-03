import React from "react";

const DailyForecast = ({ weather }) => {
  if (!weather?.data?.forecast) {
    return <div className="text-white">No forecast data</div>;
  }

  const forecast = weather.data.forecast;

  const getDailyForecast = () => {
    const dailyData = {};

    forecast.forEach((item) => {
      const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const date = new Date(item.dt * 1000);

      const dayKey1 = day[date.getDay()];

      if (!dailyData[dayKey1]) {
        dailyData[dayKey1] = {
          day: dayKey1,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0], 
          icon: item.weather[0].icon,
        };
      } else {
        dailyData[dayKey1].temp_min = Math.min(
          dailyData[dayKey1].temp_min,
          item.main.temp_min
        );

        dailyData[dayKey1].temp_max = Math.max(
          dailyData[dayKey1].temp_max,
          item.main.temp_max
        );
      }
    //  console.log(`Date: ${date.toDateString()}, Day: ${dayKey1}`);
    });
    return Object.values(dailyData);
  };

  const dailyForecast = getDailyForecast();

  return (
    <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-6">5-Day Forecast</h2>

      <div className="flex gap-4 justify-between overflow-x-auto pb-2">
        {dailyForecast.map((item, index) => {
          return (
            <div
              key={index}
              className="min-w-[120px] bg-white/10 rounded-xl p-4 text-center flex-shrink-0 
                         hover:bg-white/20 transition-all duration-200 shadow-md"
            >
              <p className="font-bold text-lg mb-3 text-white">{item.day}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                alt={item.weather.description}
                className="w-12 h-12 mx-auto mb-3"
              />
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-xs text-white/70 uppercase tracking-wide">
                    High
                  </p>
                  <p className="text-xl font-extrabold text-white">
                    {Math.round(item.temp_max)}°
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-white/70 uppercase tracking-wide">
                    Low
                  </p>
                  <p className="text-xl font-semibold text-white/90">
                    {Math.round(item.temp_min)}°
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
