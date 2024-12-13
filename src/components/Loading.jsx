import React from "react";
import loading from "/loader.gif";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[#000000]">
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
