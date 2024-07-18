import { useState, useEffect } from "react";
import Search from "../search";
import "./weatherApp.css";
import useFetch from "../useFetchHook";
import { FaTemperatureLow } from "react-icons/fa";
import InfoBox from "../InfoBox/index.jsx";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { MdOutlineWindPower } from "react-icons/md";
import weatherIcons from "./weatherIconData.js";

function Weather() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState("Dharan,Nepal");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0fa7750afd4940dbb108cf54135b0e92`
  );

  const { data, pending, errMsg } = useFetch({
    url: url,
    options: {},
  });

  function handleSearch() {
    if (searchInput && searchInput !== city) {
      setCity(searchInput);
      setUrl(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=0fa7750afd4940dbb108cf54135b0e92`
      );
    }
  }

  function convertToCelcius(tempK) {
    return (tempK - 273.15).toFixed(2);
  }

  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
  };

  const getWeatherIcon = (main) => {
    const weatherIcon = weatherIcons.find((weather) => weather.label === main);
    return weatherIcon ? (
      <weatherIcon.icon />
    ) : (
      <WiDaySunny style={{ color: "#ffb700" }} />
    );
  };

  return (
    <div className="weatherApp-wrapper">
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />
      {pending && <p>Loading...</p>}
      {errMsg && <p>{errMsg}</p>}
      {!pending && !errMsg && data && (
        <div className="weather-info-section">
          <h2>Weather in {data.name}</h2>
          <div className="info-cards">
            <InfoBox
              heading={"Sunrise"}
              information={convertUnixTime(data.sys.sunrise)}
              icon={<WiSunrise style={{ color: "#ffb700" }} />}
            />
            <InfoBox
              heading={"Sunset"}
              information={convertUnixTime(data.sys.sunset)}
              icon={<TbSunset2 style={{ color: "#ffb700" }} />}
            />
            <InfoBox
              heading={"Temperature"}
              information={`${convertToCelcius(data.main.temp)}\u00b0 C`}
              icon={<FaTemperatureLow style={{ color: "red" }} />}
            />
            <InfoBox
              heading={"Wind Speed"}
              information={`${data.wind.speed} m/s\u00b2`}
              icon={<MdOutlineWindPower style={{ color: "gray" }} />}
            />
            <InfoBox
              heading={data.weather[0].main}
              information={data.weather[0].description}
              icon={getWeatherIcon(data.weather[0].main)}
            />
            <InfoBox
              heading={"Humidity"}
              information={`${data.main.humidity}%`}
              icon={<WiHumidity style={{ color: "#11b8ff" }} />}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
