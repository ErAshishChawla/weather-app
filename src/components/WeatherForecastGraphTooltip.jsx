function WeatherForecastGraphTooltip({ content, payload, label }) {
  if (content && payload && label && payload.length > 0) {
    const data = payload[0]["payload"];
    return (
      <div className="flex flex-col justify-between gap-4 bg-gray-200 p-3 rounded-2xl w-64">
        <div className="flex flex-row justify-between items-center gap-12">
          <div className="text-md font-semibold">Time: {label}</div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center w-8 h-8">
              <img
                src={data.icon}
                alt={data.description}
                className="w-full h-full"
              />
            </div>
            <div className="text-xs font-medium">{data.description}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-md font-semibold flex flex-row grow justify-between gap-4 border-t border-gray-600">
            <div>Tempreature</div>
            <div>{data.tempreature}℃</div>
          </div>
          <div className="text-md font-semibold flex flex-row grow justify-between gap-4">
            <div>Feels Like</div>
            <div>{data.feelsLike}℃</div>
          </div>
          <div className="text-md font-semibold flex flex-row grow justify-between gap-4">
            <div>Chance of Rain</div>
            <div>{data.chanceOfRain}%</div>
          </div>
          <div className="text-md font-semibold flex flex-row grow justify-between gap-4">
            <div>Chance of Snow</div>
            <div>{data.chanceOfSnow}%</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default WeatherForecastGraphTooltip;
