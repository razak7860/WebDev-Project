import React from "react";
import HightlightText from "../Hompage/HightlightText";
import CTAButton from "../Hompage/Button";

const LearningGrid = () => {
  const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Our learning method combines flexible and practical approaches to ensure a comprehensive and engaging educational experience.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion provides industry-recognized certification to validate your new skills and enhance your career prospects.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion’s auto-grading feature provides instant, objective feedback to help learners assess their understanding and progress efficiently.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion equips learners with job-ready skills, preparing them to excel in the workforce.",
    },
  ];
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 ">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 "}
            ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
            ${card.order === 3 && "lg:col-start-2"} lg:h-[280px] p-5
            `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col pb-5 gap-3 ">
                <div className="text-4xl font-semibold">
                  {card.heading}
                  <HightlightText text={card.highlightText} />
                </div>
                <p className="font-medium">{card.description}</p>
                <div className="w-fit mt-4">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8 p-7">
                <div className="text-richblack-5 text-lg">{card.heading}</div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
