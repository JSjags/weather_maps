import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapComponentProps, weatherObject } from "../types";
import { cities } from "../constants/cities";

import infoIcon from "../assets/info.svg";

const Map: React.FC<MapComponentProps> = ({ location, cityId }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [weather, setWeather]: [any, Function] = useState([]);

  // Initialize map
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: location, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl({}), "bottom-right");

    cities.forEach((c, i) => {
      const marker = new mapboxgl.Marker({
        color: "turquoise",
      })
        .setLngLat(c.coords)
        .addTo(map);

      const popUp = new mapboxgl.Popup();
      weather.length &&
        popUp.setHTML(`
        <h2>Weather Forecast</h2>
        <p>
          <span>${weather[i].value.location.name},&nbsp</span>
          <span>${weather[i].value.location.region}</span>
        </p>
        <p>
        <span>${weather[i].value.location.country}</span>
        </p>
        <p>
          <span>lat: ${weather[i].value.location.lat},&nbsp</span>
          <span>lon: ${weather[i].value.location.lon}</span>
        </p>
        <h3>Current</h3>
        <ul>
          <li style="display: flex; align-items: center">
            <p><span>Condition:&nbsp;</span><span>${
              weather[i].value.current.condition.text
            }</span><img width="30px" height="30px" style="display: inline" src="https:${
          weather[i].value.current.condition.icon
        }" /></p>
          </li>
          <li>
            <p><span>Cloud:&nbsp;</span><span>${
              weather[i].value.current.cloud
            }%</span></p>
          </li>
          <li>
            <p><span>Feels like:&nbsp;</span><span>${
              weather[i].value.current.feelslike_c
            }°C | ${weather[i].value.current.feelslike_f}°F</span></p>
          </li>
          <li>
            <p><span>Gust:&nbsp;</span><span>${
              weather[i].value.current.gust_kph
            }km/h | ${weather[i].value.current.gust_mph}mph</span></p>
          </li>
          <li>
            <p><span>Humidity:&nbsp;</span><span>${
              weather[i].value.current.humidity
            }%</span></p>
          </li>
          
          <li>
            <p><span>Precipitation:&nbsp;</span><span>${
              weather[i].value.current.precip_in
            }in | ${weather[i].value.current.precip_mm}mm</span></p>
          </li>
          <li>
            <p><span>Pressure:&nbsp;</span><span>${
              weather[i].value.current.pressure_in
            }in | ${weather[i].value.current.pressure_mb}Pa</span></p>
          </li>
          <li>
            <p><span>Temperature:&nbsp;</span><span>${
              weather[i].value.current.temp_c
            }°C | ${weather[i].value.current.temp_f}°C</span></p>
          </li>
          <li>
            <p><span>Wind Degree:&nbsp;</span><span>${
              weather[i].value.current.wind_degree
            }°</span></p>
          </li>
          <li>
            <p><span>Wind Direction:&nbsp;</span><span>${
              weather[i].value.current.wind_dir
            }</span></p>
          </li>
          <li>
            <p><span>Wind speed:&nbsp;</span><span>${
              weather[i].value.current.wind_kph
            }km/h | ${weather[i].value.current.wind_mph}mph</span></p>
          </li>
        </ul>
        <h3>Tomorrow</h3>
        <ul>
        <li style="display: flex; align-items: center">
        <p><span>Condition:&nbsp;</span><span>${
          weather[i].value.forecast.forecastday[0].day.condition.text
        }</span><img width="30px" height="30px" style="display: inline" src="https:${
          weather[i].value.forecast.forecastday[0].day.condition.icon
        }" /></p>
      </li>        
      <li>
            <p><span>Max Temperature:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.maxtemp_c
            }°C | ${
          weather[i].value.forecast.forecastday[0].day.maxtemp_f
        }°F</span></p>
          </li>
      <li>
            <p><span>Min Temperature:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.mintemp_c
            }°C | ${
          weather[i].value.forecast.forecastday[0].day.mintemp_f
        }°F</span></p>
          </li>
      <li>
            <p><span>Average Temperature:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.avgtemp_c
            }°C | ${
          weather[i].value.forecast.forecastday[0].day.avgtemp_f
        }°F</span></p>
          </li>
          <li>
            <p><span>Max Wind:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.maxwind_kph
            }km/h | ${
          weather[i].value.forecast.forecastday[0].day.maxwind_mph
        }mph</span></p>
          </li>
          <li>
            <p><span>Total Precipitate:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.totalprecip_in
            }in | ${
          weather[i].value.forecast.forecastday[0].day.totalprecip_mm
        }mm</span></p>
          </li>
          <li>
            <p><span>Total Snow:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.totalsnow_cm
            }cm</span></p>
          </li>
          <li>
            <p><span>Average Visibility:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.avgvis_km
            }km | ${
          weather[i].value.forecast.forecastday[0].day.avgvis_miles
        }miles</span></p>
          </li>
          <li>
            <p><span>Average Humidity:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.avghumidity
            }%</span></p>
          </li>
          <li>
            <p><span>Will It Rain:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day
                .daily_will_it_rain === 1
                ? "Yes"
                : "No"
            }</span></p>
          </li>
          <li>
            <p><span>Will It Rain:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day
                .daily_will_it_rain === 1
                ? "Yes"
                : "No"
            }</span></p>
          </li>
          <li>
            <p><span>Chance Of Rain:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.daily_chance_of_rain
            }%</span></p>
          </li>
          <li>
            <p><span>Will It Snow:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day
                .daily_will_it_snow === 1
                ? "Yes"
                : "No"
            }</span></p>
          </li>
          <li>
            <p><span>Chance Of Snow:&nbsp;</span><span>${
              weather[i].value.forecast.forecastday[0].day.daily_chance_of_snow
            }%</span></p>
          </li>
        </ul>
      `);
      popUp.addClassName("popup");
      marker.setPopup(popUp);
    });
  }, [location, weather]);

  // Fetch all weather for all cities
  useEffect(() => {
    const fetchWeather = async () => {
      const result: PromiseSettledResult<any>[] = await Promise.allSettled(
        cities.map((city, i) =>
          fetch(
            `
            http://api.weatherapi.com/v1/forecast.json?q=${city.coords[1]},${
              city.coords[0]
            }&key=${import.meta.env.VITE_WEATHER_API_KEY}`
          ).then((res) => res.json())
        )
      );
      setWeather(result);
    };
    fetchWeather();
  }, []);

  return (
    <div id="map" className="flex-1 relative h-[90vh] w-full">
      <div className="absolute top-0 left-0 z-10 p-3">
        {/* info btn */}
        <div
          className="relative xs:top-[60px] top-0 z-10 bg-gray-700 w-[30px] h-[30px] rounded-full cursor-pointer border-black border-2 border-solid"
          onClick={() => setShowInfo(!showInfo)}
        >
          <img src={infoIcon} className=" invert" title="info" />
        </div>

        {/* info box */}
        <div
          className={`${
            showInfo ? "show" : "hide"
          } relative xs:top-[50px] p-3 bg-gray-100 border-black border-2 border-solid mt-5 rounded-lg max-w-[240px] min-w-[240px] pointer-events-none`}
        >
          <p className="text-[17px] font-semibold">Country </p>
          <p className="mt-2 mb-4 text-[15px]">
            {cities[cityId].name.split(", ")[1]}
          </p>
          <p className="text-[17px] font-semibold">City </p>
          <p className="mt-2 mb-4 text-[15px]">
            {cities[cityId].name.split(", ")[0]}
          </p>
          <p className="text-[17px] font-semibold">Coordinates </p>
          <p className="mt-2 mb-4 text-[15px]">
            lon: {cities[cityId].coords[0]}, lat: {cities[cityId].coords[1]}
          </p>

          <p className="mt-4 mb-0 text-[12px]">
            Click on marker on the map for more weather information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
