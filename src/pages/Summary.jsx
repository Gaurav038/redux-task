import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { monthlyPlansData, yearlyPlansData } from "../constants/PlansData";
import { AddOnsData } from "../constants/AddOnsData";

const Summary = () => {
  const navigate = useNavigate();
  const existingData = useSelector((state) => state);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedAddOns, setselectedAddOns] = useState([]);

  const [totalPrice, setTotalPrice] = useState("-");
  const duration = existingData?.step2?.billing_duration;

  console.log(existingData);

  useEffect(() => {
    let price = 0;
    //filtered AddOnsData
    const selectedIds = existingData?.step3?.add_ons_id;
    const filteredData = AddOnsData.filter((item) =>
      selectedIds.includes(item.id)
    );

    const plan_id = existingData?.step2?.plan_id;
    //filtered PlansData
    if (duration == "yearly") {
      const data = yearlyPlansData.find((item) => item.id === plan_id);
      price = filteredData.reduce((total, item) => total + item.price * 10, 0);
      price += data.price;
      setSelectedPlan(data);
    } else {
      const data = monthlyPlansData.find((item) => item.id === plan_id);
      price = filteredData.reduce((total, item) => total + item.price, 0);
      price += data.price;
      setSelectedPlan(data);
    }
    setselectedAddOns(filteredData);
    setTotalPrice(price);
  }, []);

  return (
    <div>
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Finshing up
      </h1>
      <p className="text-neutral-coolGray mb-6 hidden sm:block">
        Double-check everything looks OK before confirming.
      </p>
      <p className="text-neutral-coolGray mb-6 sm:hidden">
        Double-check everything <br /> looks OK before confirming.
      </p>
      <div className="bg-neutral-alabaster rounded-lg p-5">
        <div className="plan flex justify-between items-center mb-4">
          <div>
            <span className="text-primary-marineBlue font-[800]">
              {selectedPlan?.title}
            </span>
            <span className="text-primary-marineBlue font-[800]">
              {" "}
              ({duration})
            </span>
            <p
              onClick={() => navigate("/selectplan")}
              className="text-neutral-coolGray underline cursor-pointer"
            >
              Change
            </p>
          </div>
          <div>
            <span className="text-primary-marineBlue font-[800]">
              ${selectedPlan?.price}
            </span>
            {duration == "monthly" ? (
              <span className="text-primary-marineBlue font-[800]">/mo</span>
            ) : (
              <span className="text-primary-marineBlue font-[800]">/yr</span>
            )}
          </div>
        </div>

        <hr />

        {selectedAddOns.map((item) => {
          return (
            <div
              key={item.id}
              className="plan flex justify-between items-center mt-4"
            >
              <div>
                <p className="text-neutral-coolGray">{item.value}</p>
              </div>
              <div>
                <p className="text-primary-marineBlue mb-2 text-[14px] font-[500]">
                  +${duration == "monthly" ? item.price : item.price * 10}
                  {duration == "monthly" ? (
                    <span className="text-primary-marineBlue">/mo</span>
                  ) : (
                    <span className="text-primary-marineBlue">/yr</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between p-5">
        <div>
          <p className="text-neutral-coolGray">
            Total (per{" "}
            {duration == "monthly" ? <span>/mo</span> : <span>/yr</span>})
          </p>
        </div>
        <div className="text-primary-purplishBlue font-[800] text-xl">
          ${totalPrice}
          {duration == "monthly" ? (
            <span className=" font-[800]">/mo</span>
          ) : (
            <span className="font-[800]">/yr</span>
          )}
        </div>
      </div>

      <div className="flex justify-around sm:justify-between items-center pt-[260px] sm:pt-[79px]">
        <button
          onClick={() => navigate("/addons")}
          className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
        >
          Go back
        </button>

        <button
          className="bg-primary-purplishBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
          onClick={() => alert("confirm  order successfully!!!")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Summary;
