import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log({ data });
    try {
      setLoading(true);
      const response = { status: "ok" };
      setLoading(false);
    } catch (error) {
      console.log("error occurred", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "",
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-14 text-black">
        <div className="flex gap-x-5">
          {/* firstname */}
          <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-[red]">
                Please enter your name correctly.
              </span>
            )}
          </div>
          {/* last name */}
          <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("firstname")}
            />
          </div>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please enter your email correctly.</span>}
        </div>

        {/* phone number */}
        <div className="flex flex-col">
          <label htmlFor="phonenumber">phone number</label>
          <div className="flex justify-between">
            {/* drop down */}
            <div className="">
              <select
                name="dropdown"
                id="dropdown"
                className="w-[150px] h-[32px] rounded-md"
                {...register("countrycode", { required: true })}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                {CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code}-{element.country}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* number input */}
            <div>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                {...register("phoneNo", {
                  required: { value: true, message: "This field is required" },
                  maxLength: { value: 10, message: "Invalid phone number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="text-[red]">{errors.phoneNo.message}</span>
          )}
        </div>

        {/* message */}
        <div className="flex flex-col">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please Enter the message</span>}
        </div>
        <button
          type="submit"
          className="rounded-md text-center px-6 text-[16px] font-bold text-black bg-yellow-50 "
        >
          Send message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
