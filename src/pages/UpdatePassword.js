import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const UpdatePassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(
      resetPassword(
        formData.password,
        formData.confirmPassword,
        token,
        navigate
      )
    );
  };
  return (
    <div className="flex items-center justify-center my-auto">
      {loading ? (
        <div>loading....</div>
      ) : (
        <div className="max-w-[500px] p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new password
          </h1>
          <p className="text-[1.125rem] my-4 leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you're done
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="w-full relative bg-yellow-5">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sub className="text-pink-200">*</sub>
              </p>
              <input
                className="w-full text-[18px] leading-6 text-white p-[0.7rem] bg-richblack-600 rounded-[0.5rem]"
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
              <span
                className="absolute right-4 top-[65%]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible
                    style={{ fontSize: "20px", color: "white" }}
                  />
                ) : (
                  <AiFillEye style={{ fontSize: "20px", color: "white" }} />
                )}
              </span>
            </label>
            <label className="relative w-full">
              <p className="mt-2 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm new password <sub className="text-pink-200">*</sub>
              </p>

              <input
                className=" w-full text-[16px] leading-6 text-white p-[0.7rem] bg-richblack-600 rounded-[0.5rem]"
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-4 top-[77%] "
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible
                    style={{ fontSize: "20px", color: "white" }}
                  />
                ) : (
                  <AiFillEye style={{ fontSize: "20px", color: "white" }} />
                )}
              </span>
            </label>

            <button
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2  text-richblack-5">
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
