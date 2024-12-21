import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Hompage/HightlightText";
import CTAButton from "../components/core/Hompage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Hompage/CodeBlocks";
import LearningLanguageSection from "../components/core/Hompage/LearningLanguageSection";
import TimelineSection from "../components/core/Hompage/TimelineSection";
import InstructorSection from "../components/core/Hompage/InstructorSection";
import ExploreMore from "../components/core/Hompage/ExploreMore";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <div className="">
      {/*Section 1 */}

      <div
        className="mt-16 p-1 relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white
        transition-all duration-200  justify-between  "
      >
        <Link to="/signup">
          <div className=" mx-auto w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with <HighlightText text="Coding Skills" />
        </div>

        <div className="mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex justify-center gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="shadow-blue-200 mx-3 my-10">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* { Code section block} */}
        <div>
          <CodeBlocks
            position={" flex"}
            heading={
              <div className="text-4xl font-semibold text-white">
                Unlock Your <HighlightText text={"coding potential"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html> \n head><title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n head>\nhead> \n h1><ahref="/">Header</a>/h1> \n nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n /nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code section 2 */}
        <div>
          <CodeBlocks
            position={" flex flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold text-white">
                Start <HighlightText text={"coding in seconds "} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html> \n head><title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n head>\nhead> \n h1><ahref="/">Header</a>/h1> \n nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a> \n /nav>`}
            codeColor={"text-blue-100"}
          />
        </div>
        <ExploreMore />
      </div>

      {/*Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg h-[310px]">
          <div className="h-[150px]"></div>
          <div className="w-11/12 max-w-maxContent flex items-center justify-center gap-5  mx-auto">
            <div className="flex gap-10  text-black mt-14">
              <CTAButton active={true} linkto={"signup"}>
                <div className="flex gap-2 items-center">
                  <div>Explore Full Catalog</div>
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"signup"}>
                <div className="flex gap-2 items-center">
                  <div>Learn More</div>
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className=" mx-auto p-4 flex flex-col bg-white  ">
          <div className="w-10/12 flex  mx-auto mt-[90px] justify-end gap-12">
            <div className=" text-4xl  font-semibold mt-7">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col  justify-center gap-4 pb-2 items-start">
              <div className="">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <div className=" mb-4 py-8">
                <CTAButton active={true} linkto={"/login"}>
                  <div className="flex gap-4 items-center">
                    <div>Learn More</div>
                    <FaArrowRight />
                  </div>
                </CTAButton>
              </div>
            </div>
          </div>
          <div className="w-10/12 mx-auto mt-[90px] gap-12">
            <TimelineSection />
            <LearningLanguageSection />
          </div>
        </div>
      </div>

      {/*Section 3 */}
      <div className="flex w-10/12 mx-auto items-center flex-col  gap-8 bg-richblack-900 text-white max-w-maxContent ">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-40">
          Review from other learners
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
