import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { monthlyPlansData, yearlyPlansData } from "../constants/PlansData";
import { useDispatch, useSelector } from "react-redux";
import { updateStep2 } from "../redux/slices/formDetailsSlice";
import Toggle from "react-toggle";

const SelectPlan = () => {
  const navigate = useNavigate();
  const existingStep2Data = useSelector((state) => state.step2);

  const [toggleYearly, setToggleYearly] = useState(
    existingStep2Data?.billing_duration == "yearly" ? true : false
  );
  const [selectedPlan, setSelectedPlan] = useState(
    existingStep2Data?.plan_id ? existingStep2Data?.plan_id : 0
  );
  const dispatch = useDispatch();

  console.log(existingStep2Data);
  const handleToggleYearly = () => {
    setToggleYearly((prev) => !prev);
  };

  const handleSelectedPlan = (ind) => {
    setSelectedPlan(ind + 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedPlan !== 0) {
      navigate("/addons");
      dispatch(
        updateStep2({
          billing_duration: toggleYearly ? "yearly" : "monthly",
          plan_id: selectedPlan,
        })
      );
    } else {
      alert("Please choose a plan");
    }
  };

  return (
    <div>
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Select your Plan
      </h1>
      <p className="text-neutral-coolGray mb-6">
        You have the option of monthly or yearly billing.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col relative">
        <div
          className={`${
            toggleYearly ? "hidden" : "block"
          } plansMonthly mb-8 flex flex-col sm:flex-row justify-between cursor-pointer`}
        >
          {monthlyPlansData.map((item, idx) => {
            return (
              <div
                onClick={() => handleSelectedPlan(idx)}
                key={item.id}
                className={`plan ${
                  selectedPlan != idx + 1 ? "bg-white" : "bg-primary-lightBlue"
                } border-2 ${
                  selectedPlan != idx + 1
                    ? "border-neutral-lightGray"
                    : "border-primary-purplishBlue"
                } rounded-md p-4 flex items-center justify-around mb-4 sm:mb-0 sm:block basis-[31%] transition-all duration-300 hover:border-primary-purplishBlue`}
              >
                <div class="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  {item.img}
                </div>
                <h4 className="text-primary-marineBlue font-[500]">
                  {item.title}
                </h4>
                <p className="text-neutral-coolGray text-[14px] font-[500]">
                  ${item.price}/mo
                </p>
              </div>
            );
          })}
        </div>

        <div
          className={`${
            toggleYearly ? "block" : "hidden"
          } plansYearly mb-8 flex flex-col sm:flex-row justify-between cursor-pointer`}
        >
          {yearlyPlansData.map((item, idx) => {
            return (
              <div
                onClick={() => handleSelectedPlan(idx)}
                key={item.id}
                className={`plan ${
                  selectedPlan != idx + 1 ? "bg-white" : "bg-primary-lightBlue"
                } border-2 ${
                  selectedPlan != idx + 1
                    ? "border-neutral-lightGray"
                    : "border-primary-purplishBlue"
                } rounded-md p-4 flex items-center justify-around mb-4 sm:mb-0 sm:block sm:basis-[31%] transition-all duration-300 hover:border-primary-purplishBlue`}
              >
                <div class="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
                  {item.img}
                </div>
                <h4 className="text-primary-marineBlue font-[500]">
                  {item.title}
                </h4>
                <p className="text-neutral-coolGray text-[14px] font-[500]">
                  ${item.price}/mo
                </p>
                <p className="text-primary-marineBlue text-[12px]">
                  {item.extra}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className={`bg-neutral-alabaster flex justify-center items-center py-3 space-x-8 rounded-md ${
            toggleYearly ? "mb-[70px]" : "mb-[77px]"
          } ${toggleYearly ? "sm:mb-[79px]" : "sm:mb-[97px]"}`}
        >
          <p
            className={`${
              toggleYearly ? "text-neutral-coolGray" : "text-primary-marineBlue"
            } text-[14px] font-[500]`}
          >
            Monthly
          </p>
          <Toggle
            defaultChecked={toggleYearly}
            icons={false}
            onChange={handleToggleYearly}
          />
          <p
            className={`${
              toggleYearly
                ? "text-primary-marineBlue"
                : "text-neutral-coolGray "
            } text-[14px] font-[500]`}
          >
            Yearly
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
          >
            Go back
          </button>

          <button
            className="bg-primary-marineBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
            type="sumbit"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectPlan;
