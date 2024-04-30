import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStep1 } from "../redux/slices/formDetailsSlice";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingStep1Data = useSelector((state) => state.step1);

  const [formData, setFormData] = useState(existingStep1Data);
  const [alert, setAlert] = useState({
    name: false,
    email: false,
    number: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const alerts = {
      name: formData.name === "",
      email: !emailRegex.test(formData.email),
      number: formData.number === "",
    };

    setAlert(alerts);

    // Return true if the form is valid
    return !alerts.name && !alerts.email && !alerts.number;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    const isValid = validateForm();

    if (isValid) {
      // Update form data in Redux store if the form is valid
      dispatch(updateStep1(formData));
      // Navigate to the next page
      navigate("/selectplan");
    }
  };
  return (
    <div>
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Personal info
      </h1>
      <p className="text-neutral-coolGray mb-6">
        Please provide your name, email address, and phone number.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="form-wrapper flex flex-col relative">
          <label className="text-primary-marineBlue font-[500] mb-2">
            Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${
              alert.name
                ? "focus:outline-primary-strawberryRed"
                : "focus:outline-primary-marineBlue"
            } mb-6 outline outline-1 outline-neutral-lightGray rounded-[4px] p-3 `}
            type="text"
            placeholder="enter name"
          />
          <span
            className={`${
              alert.name ? "inline" : "hidden"
            } text-primary-strawberryRed font-[500] absolute right-[10px]`}
          >
            This field is required
          </span>
          <label className="text-primary-marineBlue font-[500] mb-2">
            Email Address
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${
              alert.email
                ? "focus:outline-primary-strawberryRed"
                : "focus:outline-primary-marineBlue"
            } mb-6 outline outline-1 outline-neutral-lightGray rounded-[4px] p-3 `}
            type="email"
            placeholder="enter email"
          />
          <span
            className={`${
              alert.email ? "inline" : "hidden"
            } text-primary-strawberryRed font-[500] absolute top-[100px] right-[10px]`}
          >
            This field is required
          </span>
          <label className="text-primary-marineBlue font-[500] mb-2">
            Phone Number
          </label>
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
            className={`${
              alert.number
                ? "focus:outline-primary-strawberryRed"
                : "focus:outline-primary-marineBlue"
            } mb-6 outline outline-1 outline-neutral-lightGray rounded-[4px] p-3 `}
            type="text"
            placeholder="enter number"
          />
          <span
            className={`${
              alert.number ? "inline" : "hidden"
            } text-primary-strawberryRed font-[500] absolute top-[200px] right-[10px]`}
          >
            This field is required
          </span>
        </div>
        <div className="flex justify-end items-end py-[2px] mt-[120px] sm:mt-[26px]">
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

export default PersonalInfo;
