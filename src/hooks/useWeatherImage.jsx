import weatherDescriptions from "../assets/weatherDescriptions.json";
function useWeatherImage(data) {
  const code = data.condition.code;

  const matchedDescriptions = weatherDescriptions.filter(
    (weatherDescription) => {
      if (weatherDescription.code === code) {
        return true;
      }
      return false;
    }
  );

  let imgNumber;
  if (matchedDescriptions) {
    imgNumber = matchedDescriptions[0].eq_icon;
  }

  const imgUrl = `/src/assets/images/${imgNumber}.jpeg`;

  return imgUrl;
}

export default useWeatherImage;
