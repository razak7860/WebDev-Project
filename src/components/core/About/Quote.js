import React from "react";
import HightlightText from "../Hompage/HightlightText";

const Quote = () => {
  return (
    <div className="text-[#AFB2BF]">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform <HightlightText text={"combines technology"} />,
      <span className="text-[linear-gradient(117.83deg, #FF512F -4.8%, #F09819 107.46%)]">
        expertise
      </span>
      , and community to
      <span> create an unparalleled educational experience</span>
    </div>
  );
};

export default Quote;
