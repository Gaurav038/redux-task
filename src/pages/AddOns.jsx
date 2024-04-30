import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddOnsData } from "../constants/AddOnsData";
import { useDispatch, useSelector } from "react-redux";
import { updateStep3 } from "../redux/slices/formDetailsSlice";

const AddOns = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingStep3Data = useSelector((state) => state.step3);
  const [selectedAddOns, setSelectedAddOns] = useState(
    existingStep3Data?.add_ons_id ? existingStep3Data?.add_ons_id : []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAddOns.length > 0) {
      dispatch(
        updateStep3({
          add_ons_id: selectedAddOns,
        })
      );
      navigate("/summary");
    } else {
      alert("Please choose a add ons");
    }
  };

  const handleChange = (e, id) => {
    if (e.target.checked) {
      if (!selectedAddOns.includes(id)) {
        setSelectedAddOns((prev) => [...prev, id]);
      }
    } else {
      let data = selectedAddOns.filter((item) => item !== id);
      setSelectedAddOns(data);
    }
  };

  console.log(selectedAddOns);
  return (
    <div>
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Pick add-ons
      </h1>
      <p className="text-neutral-coolGray mb-6">
        Add-ons help enhance your gaming experience.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative space-y-4"
      >
        {AddOnsData.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={`${
                !selectedAddOns.includes(idx + 1)
                  ? "bg-white"
                  : "bg-primary-lightBlue"
              } border-2 ${
                !selectedAddOns.includes(idx + 1)
                  ? "border-neutral-lightGray"
                  : "border-primary-purplishBlue"
              } rounded-md flex items-center justify-between p-4 cursor-pointer transition-all duration-300 hover:border-primary-purplishBlue`}
            >
              <div className="flex items-center space-x-6">
                <div>
                  <input
                    className="h-5 w-5 cursor-pointer"
                    onChange={(e) => handleChange(e, idx + 1)}
                    type="checkbox"
                    value={item.value}
                    checked={selectedAddOns.includes(idx + 1)}
                  />
                </div>
                <div>
                  <p className="font-[500] text-primary-marineBlue">
                    {item.value}
                  </p>
                  <p className="text-neutral-coolGray text-[14px]">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-primary-purplishBlue">+${item.price}/mo</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between items-center pt-[100px] sm:pt-[47px]">
          <button
            onClick={() => navigate("/selectplan")}
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

export default AddOns;
