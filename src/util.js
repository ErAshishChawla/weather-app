import { toast } from "react-toastify";
import { DateTime } from "luxon";
export const generatePayload = (
  mode = null,
  lat = null,
  lon = null,
  city = null,
  country = null
) => {
  let userCoordinates;
  let userCityData;
  if (lat && lon) {
    userCoordinates = {
      lat,
      lon,
    };
  } else {
    userCoordinates = null;
  }
  if (city && country) {
    userCityData = {
      city,
      country,
    };
  } else {
    userCityData = null;
  }
  const payload = {
    locationMode: mode,
    userCoordinates,
    userCityData,
  };
  return payload;
};

const getInfoToast = (message, theme = "light") => {
  return toast.info(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

const getSuccessToast = (message, theme = "light") => {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

const getErrorToast = (message, theme = "light") => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

export const displayToast = (message, mode, type, theme = "light") => {
  if (mode) {
    if (type === "info") {
      getInfoToast(message, theme);
    } else if (type === "success") {
      getSuccessToast(message, theme);
    } else {
      getErrorToast(message, theme);
    }
  } else {
    console.log("Unknown toast config");
    return;
  }
};

export const formatUserCoordinates = (userCoordinates) => {
  if (!userCoordinates) {
    return null;
  }
  const { lat, lon } = userCoordinates;
  return `${lat},${lon}`;
};

export const formatTimezoneData = (data) => {
  if (!data) {
    return null;
  }
  return {
    localTime: data.location.localtime,
    localTimeEpoch: data.location.localtime_epoch,
    timezone: data.location.tz_id,
  };
};

export const getShortTimeString = (dateTimeObj) => {
  const time = dateTimeObj.setLocale("en-US").toLocaleString({
    timeStyle: "short",
    hour12: false,
  });

  const day = dateTimeObj.setLocale("en-US").toLocaleString({
    weekday: "short",
  });

  const dayTime = `${day} ${time}`;

  return dayTime;
};

export const getDateTimeObj = (timezone) => {
  if (!timezone) {
    return null;
  }
  return DateTime.now().setZone(timezone);
};

export const getIconUrl = (data) => {
  return data.condition.icon;
};

export const getWeatherDescription = (data) => {
  return data.condition.text;
};

export const getWeatherDetails = (data) => {
  if (!data) {
    return;
  }
  return {
    description: data.condition.text,
    temp: data.temp_c,
    feelsLike: data.feelslike_c,
    wind: data.wind_kph,
    pressure: data.pressure_mb,
    uvIndex: data.uv,
    visibility: data.vis_km,
    // airQuality: data?.air_quality.pm2_5,
    humidity: data.humidity,
  };
};

export const getCityCountry = (data) => {
  return {
    city: data.name,
    country: data.country,
  };
};

export const getClosestForecast = (data, difference) => {
  if (!data) {
    return;
  }
  const combinedHourData = [];
  data.forecastday.forEach((day) => {
    combinedHourData.push(...day.hour);
  });

  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const differenceInSeconds = difference * 3600;

  const closest = combinedHourData.reduce((prev, curr) => {
    const prevDiff = Math.abs(
      prev.time_epoch - currentTimeStamp - differenceInSeconds
    );
    const currDiff = Math.abs(
      curr.time_epoch - currentTimeStamp - differenceInSeconds
    );

    return prevDiff < currDiff ? prev : curr;
  });

  return closest;
};

export const formatWeatherData = (weatherData) => {
  if (!weatherData) {
    return;
  }
  const allMax = [];
  const allMin = [];
  const formattedForecastData = [];
  const { current, forecast, location } = weatherData;
  const formattedCurrentData = { ...current };
  const formattedLocationData = {
    country: location.country,
    city: location.name,
    timezone: location.tz_id,
  };

  const forecastDays = forecast.forecastday;

  forecastDays.forEach((forecastDay, idx) => {
    const forecastObj = { ...forecastDay };
    if (idx === 0) {
      forecastObj.weekday = "Today";
    } else {
      forecastObj.weekday = DateTime.fromSeconds(forecastDay.date_epoch, {
        zone: formattedLocationData.timezone,
      })
        .setLocale("en-US")
        .toLocaleString({
          weekday: "long",
        });
    }

    allMax.push(forecastDay.day.maxtemp_c);
    allMin.push(forecastDay.day.mintemp_c);
    forecastObj.maxTemp = forecastDay.day.maxtemp_c;
    forecastObj.minTemp = forecastDay.day.mintemp_c;
    formattedForecastData.push(forecastObj);
  });

  formattedForecastData.forEach((forecast) => {
    forecast.allMin = allMin;
    forecast.allMax = allMax;
    forecast.allTimeMin = Math.min(...allMin);
    forecast.allTimeMax = Math.max(...allMax);
  });
  return {
    forecast: formattedForecastData,
    current: formattedCurrentData,
    location: formattedLocationData,
  };
};

export const getDayProgress = (data) => {
  const { forecast, location } = formatWeatherData(data);
  const currentDateTimeObj = getDateTimeObj(location.timezone);
  const [selectedForecast, ...waste] = forecast.filter((forecastDay) => {
    if (forecastDay.date === currentDateTimeObj.toFormat("yyyy-LL-dd")) {
      return true;
    }
    return false;
  });
  const { sunrise, sunset } = selectedForecast.astro;

  const sunriseDateObj = DateTime.fromFormat(sunrise, "hh:mm a", {
    zone: location.timezone,
  });
  const sunsetDateObj = DateTime.fromFormat(sunset, "hh:mm a", {
    zone: location.timezone,
  });

  const totalDayTimeObj = sunsetDateObj.diff(sunriseDateObj, "minutes");
  let totalDayTimeMinutes = totalDayTimeObj.minutes;
  const passedDayTimeObj = currentDateTimeObj.diff(sunriseDateObj, "minutes");
  let passedDayTimeMinutes = passedDayTimeObj.minutes;

  if (!passedDayTimeMinutes) {
    passedDayTimeMinutes = 0;
  }

  let dayProgress = (passedDayTimeMinutes / totalDayTimeMinutes) * 100;
  if (passedDayTimeMinutes > totalDayTimeMinutes) {
    dayProgress = 100;
  }

  if (passedDayTimeMinutes < 0) {
    dayProgress = 0;
  }

  return parseInt((dayProgress * 180) / 100);
};

export const formatForecastForGraph = (forecast) => {
  const hourlyForecast = forecast.hour;
  const graphData = hourlyForecast.map((hourForecast) => {
    let hour = DateTime.fromFormat(
      hourForecast.time,
      "yyyy-LL-dd hh:mm"
    ).toLocaleString({
      hour12: false,
      timeStyle: "short",
    });
    if (hour === "24:00") {
      hour = "00:00";
    }

    return {
      time: hour,
      icon: hourForecast.condition.icon,
      description: hourForecast.condition.text,
      tempreature: parseInt(hourForecast.temp_c),
      feelsLike: parseInt(hourForecast.feelslike_c),
      chanceOfRain: hourForecast.chance_of_rain,
      chanceOfSnow: hourForecast.chance_of_snow,
    };
  });
  return graphData;
};

export const getWidthOffsetForWeatherBar = (forecastData, barWidth = 8) => {
  const allTimeMax = parseInt(forecastData.allTimeMax);
  const allTimeMin = parseInt(forecastData.allTimeMin);

  const currentMaxTemp = parseInt(forecastData.maxTemp);
  const currentMinTemp = parseInt(forecastData.minTemp);

  const degreePerRem = ((allTimeMax - allTimeMin) / barWidth).toFixed(2);
  const currentTempBarWidth = (
    (currentMaxTemp - currentMinTemp) /
    degreePerRem
  ).toFixed(2);
  const currentTempBarOffset = (
    (currentMinTemp - allTimeMin) /
    degreePerRem
  ).toFixed(2);
  return {
    width: currentTempBarWidth,
    offset: currentTempBarOffset,
  };
};
