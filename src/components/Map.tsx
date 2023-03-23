import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapComponentProps } from "../types";
import { cities } from "../constants/cities";

import infoIcon from "../assets/info.svg";

const Map: React.FC<MapComponentProps> = ({ location, cityId }) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamVzamFnczAxIiwiYSI6ImNsZmsyYjY5cDA2bjczdW1jd20xdXk4anUifQ.oO_qF-jFVpfPiN5JM1vJGw";

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
      popUp.setHTML("<h1>Pop Up</h1>");
      // popUp.on("click", () => alert("hello!"));
      marker.on("click", function (e) {
        alert("clicked");
      });
      marker.setPopup(popUp);
    });
  }, [location]);

  return (
    <div id="map" className="relative h-[90vh] w-full">
      <div className="absolute top-0 left-0 z-10 p-5">
        {/* info btn */}
        <div
          className="relative z-10 bg-gray-700 w-[30px] h-[30px] rounded-full cursor-pointer border-black border-2 border-solid"
          onClick={() => setShowInfo(!showInfo)}
        >
          <img src={infoIcon} className=" invert" title="info" />
        </div>

        {/* info box */}
        <div
          className={`${
            showInfo ? "show" : "hide"
          } p-3 bg-gray-100 border-black border-2 border-solid mt-3 rounded-lg max-w-[240px] min-w-[240px]`}
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
        </div>
      </div>
    </div>
  );
};

export default Map;
