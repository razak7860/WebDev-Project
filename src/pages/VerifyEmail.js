import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center  my-auto text-yellow-5">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375] text-richblack-5">
          Verify Email
        </h1>
        <p className="text-[1.125rem] my-4 leading-[1.625rem] text-richblack-100">
          A Verification code has been sent to you. Enter the code below
        </p>
        <form onSubmit={handleOnSubmit}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            containerStyle="text-richblack-900"
            inputStyle="bg-richblack-600 w-[50px] rounded-md h-[48px] text-center text-white "
            skipDefaultStyles="true"
            renderInput={(props) => <input {...props} placeholder="" />}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px]   font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>

        <div className="flex justify-between py-3">
          <div>
            <Link to="/login">
              <p>Back to login</p>
            </Link>
          </div>

          <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
