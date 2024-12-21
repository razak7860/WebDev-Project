import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HightlightText from "./HightlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-14 mx-auto ">
      <div className="flex flex-row gap-20 items-center">
        <div className="w-[50%] shadow-white shadow-[-20px_-20px_0_0]">
          <img src={Instructor} alt="" />
        </div>
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an <HightlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true}>
              <div className="flex gap-2 items-center justify-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
