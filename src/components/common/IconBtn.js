import React from "react";

const IconBtn = ({
  text,
  onClick,
  chidren,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        outline ? "border border-gray-500" : "bg-gray-500"
      } ${customClasses}`}
    >
      {chidren ? (
        <>
          <span>{text}</span>
          {chidren}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
