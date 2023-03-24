import React, { FunctionComponent, useEffect, useState } from "react";
import { cities } from "../constants/cities";
import { SidebarComponentProps } from "../types";

import menu from "../assets/Menu.svg";
import close from "../assets/close.svg";

import search from "../assets/search.png";

const SideBar: React.FC<SidebarComponentProps> = ({
  setLocation,
  setCityId,
  cityId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth > 240) {
        setToggle(false);
      }
    });
    return () => {
      window.removeEventListener("resize", (e) => {
        if (window.innerWidth > 240) {
          setToggle(false);
        }
        if (window.innerWidth < 640) {
          setToggle(true);
        }
      });
    };
  }, []);

  return (
    <div className="relative">
      {/* menu btn */}
      <div
        className="sm:hidden absolute px-2 flex items-center justify-center bg-gray-100 rounded-br -right-11 top-0 z-40 border-l border-solid border-gray-200 cursor-pointer hover:bg-gray-200 duration-200
       ease-in-out"
        onClick={() => setToggle(!toggle)}
      >
        <img
          src={toggle ? menu : close}
          className="w-[30px] h-[50px] brightness-0"
        />
      </div>
      <div
        className={`${
          toggle ? "min-w-[0] max-w-[0]" : "min-w-[225px]max-w-[240px]"
        } relative overflow-x-visible pt-3 h-[90vh] bg-gray-100 duration-300 ease-in-out`}
      >
        <h1 className="text-[24px] px-3 font-semibold">Cities</h1>

        {/* SearchBox */}
        <div className="m-2 shadow-md flex flex-nowrap rounded-md w-[90%]">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search cities..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-tl-md rounded-bl-md w-[85%] focus:outline-2 focus:outline-teal-300"
          />
          <button className="flex items-center justify-center bg-teal-300 w-[15%] hover:bg-amber-300 duration-200 ease-in-out cursor-pointer rounded-tr-md rounded-br-md">
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
            cities.filter((city) =>
              city.name.match(new RegExp(searchTerm, "gi"))
            ).length <= 0 && (
              <li className="text-center mt-5">No results found.</li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
