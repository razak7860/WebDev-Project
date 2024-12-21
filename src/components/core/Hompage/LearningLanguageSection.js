import React from "react";
import HighlightText from "./HightlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 my-[8%]  ">
        <div className="text-4xl font-semibold h-12 text-center ">
          Your Swiss Knife for <HighlightText text={" learning any language"} />
        </div>
        <div className=" mx-auto w-[50%] text-base text-richblack-500 text-center font-medium ">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex mt-5 items-center justify-center ">
          <img
            src={know_your_progress}
            alt=""
            className="object-contain -mr-32"
          />
          <img src={compare_with_others} alt="" className="object-contain" />
          <img
            src={plan_your_lesson}
            alt=""
            className="object-contain -ml-40"
          />
        </div>
        <div className="flex justify-center">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
