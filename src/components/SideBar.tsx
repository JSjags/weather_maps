import React, { FunctionComponent, useState } from "react";
import { cities } from "../constants/cities";
import { SidebarComponentProps } from "../types";

import search from "../assets/search.png";

const SideBar: React.FC<SidebarComponentProps> = ({
  setLocation,
  setCityId,
  cityId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pt-3 h-[90vh] w-[280px] bg-gray-100">
      <h1 className="text-[24px] px-3 font-semibold">Cities</h1>

      {/* SearchBox */}
      <div className="m-2 shadow-md flex flex-nowrap rounded-md">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search cities..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-tl-md rounded-bl-md flex-[0.85] focus:outline-2 focus:outline-teal-300"
        />
        <button className="flex items-center justify-center bg-teal-300 flex-[0.15] hover:bg-amber-300 duration-200 ease-in-out cursor-pointer rounded-tr-md rounded-br-md">
          <img className="w-[20px] h-[20px] invert" src={search} />
        </button>
      </div>

      {searchTerm && (
        <p
          className="m-2 text-gray-500 hover:text-cyan-500 duration-100 cursor-pointer"
          onClick={() => setSearchTerm("")}
        >
          Clear Search
        </p>
      )}

      <ul className="h-full pb-20 overflow-scroll fix-scrollbar">
        {searchTerm
          ? cities
              .filter((city) => city.name.match(new RegExp(searchTerm, "gi")))
              .map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setLocation(city.coords);
                    setCityId(index);
                  }}
                  className=" relative py-2 px-4 text-[18px] hover:bg-teal-300 duration-300 ease-in-out cursor-pointer"
                >
                  <div
                    className={`${
                      cityId === index
                        ? "bg-teal-400 border-solid border-[2px] border-gray-200"
                        : ""
                    } absolute left-[5px] top-1/2 -translate-y-1/2 w-[8px] h-[90%]
                 rounded-full`}
                  ></div>
                  <span>{city.name}</span>
                </li>
              ))
          : cities.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  setLocation(city.coords);
                  setCityId(index);
                }}
                className=" relative py-2 px-4  text-[18px] hover:bg-teal-300 duration-300 ease-in-out cursor-pointer"
              >
                <div
                  className={`${
                    cityId === index
                      ? "bg-teal-400 border-solid border-[2px] border-gray-200"
                      : ""
                  } absolute left-[5px] top-1/2 -translate-y-1/2 w-[8px] h-[90%]
                 rounded-full`}
                ></div>
                <span>{city.name}</span>
              </li>
            ))}
        {searchTerm &&
          cities.filter((city) => city.name.match(new RegExp(searchTerm, "gi")))
            .length <= 0 && (
            <li className="text-center mt-5">No results found.</li>
          )}
      </ul>
    </div>
  );
};

export default SideBar;
