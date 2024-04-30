import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { data } from "../constants/data";

const Sidebar = () => {
  const location = useLocation();

  const canNavigateTo = (targetStep) => {
    const currentItem = data.find((item) =>
      item.linkTo.includes(location.pathname)
    );
    const currentStep = currentItem.id;
    console.log(
      targetStep,
      currentStep,
      location.pathname.includes("/summary"),
      location.pathname
    );
    return targetStep <= currentStep;
  };
  return (
    <div className="absolute top-0 left-0 right-[100%] sm:relative bg-mobile sm:bg-desktop sm:bg-cover bg-no-repeat w-[100%] h-[100%] p-12 sm:basis-[25%] sm:rounded-lg flex items-start justify-center sm:flex-col sm:justify-start bg-[#6b16ba]">
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center space-x-4 leading-4 sm:mb-10"
          >
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#000" : "hsl(229, 24%, 87%)",
                background: isActive ? "hsl(228, 100%, 84%)" : "transparent",
                border: isActive ? "none" : "2px solid hsl(229, 24%, 87%)",
                fontWeight: "500",
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              })}
              to={item.linkTo}
              onClick={(e) => {
                if (!canNavigateTo(item.id)) {
                  e.preventDefault();
                }
              }}
            >
              {item.id}
            </NavLink>
            <div>
              <p className="hidden sm:block uppercase text-neutral-coolGray text-[14px]">
                {item.step}
              </p>
              <p className="hidden sm:block uppercase text-neutral-lightGray font-[500] tracking-wider">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
