import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HightlightText from "./HightlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular, Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl font-semibold text-center">
        Unlock the <HightlightText text={" Power of code"} />
      </div>

      <p className="text-center text-richblack-300 text-lg text-[16px] font-semibold  mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="flex rounded-full bg-richblack-800  border-richblack-100 p-1 mt-5 mb-10">
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              className={`text-[16px] flex items-center gap-2 ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } rounded-full  transition-all duration-200 cursor-pointer px-7 py-2 hover:bg-richblack-900 hover:text-richblack-5
              }`}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="h-[150px] ">
        {/*Course Card ka group*/}
        <div
          className="absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%]
         lg:translate-y-[50%] text-black mt-20 lg:px-0 px-3 "
        >
          {courses.map((element, index) => {
            return (
              <CourseCard
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
