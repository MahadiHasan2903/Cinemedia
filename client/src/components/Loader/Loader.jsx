import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/loader.json";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Lottie
        animationData={animationData}
        className="w-[300px] 800px:w-[500px]"
      />
    </div>
  );
};

export default Loader;
