import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../assets/1.jpg";
import banner2 from "../../assets/2.jpg";
import banner3 from "../../assets/3.jpg";
import banner4 from "../../assets/5.jpg";
import banner5 from "../../assets/6.jpg";

const images = [banner1, banner2, banner3, banner4, banner5];

const SlideShow = () => {
  const zoomOutProperties = {
    scale: 0.4,
    indicators: true,
    arrows: false,
  };

  return (
    <div className="w-full slide-container h-40vh">
      <style>
        {`
          .indicators {
            gap: 15px; 
          }
        `}
      </style>
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img
            key={index}
            style={{ width: "100%" }}
            src={each}
            alt={`Slide ${index}`}
          />
        ))}
      </Zoom>
    </div>
  );
};

export default SlideShow;
