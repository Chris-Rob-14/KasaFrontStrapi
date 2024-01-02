import React, { useState } from "react";
import "./Slider.css";
import arrowLeft from "../../images/arrowLeft.svg";
import arrowRight from "../../images/arrowRight.svg";

function Slider({ pictures }) {
  const [current, setCurrent] = useState(0);
  const length = pictures.length;

  const prev = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  
  const next = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // Assurez-vous que les images sont bien définies et qu'il y a des images à afficher
  if (!pictures || length === 0) {
    return <div> Pas d'images à afficher</div>;
  }

  return (
    <div className="sliders">
      {pictures.map((picture, index) => (
        <div
          className= {index === current ? 'slide-active' : 'slides'}
          key={index}
        >
          {index === current && (
            <img src={picture.original} className="slide-image" alt="slides" />
          )}
        </div>
      ))}
      {length > 1 && (
        <>
          <span className='slider-counter'>
            {current + 1}/{length}
          </span>
          <div className="left-arrow" onClick={prev}>
            <img src={arrowLeft} alt="Slide précédente" className="left-arrow" />
          </div>
          <div className="right-arrow" onClick={next}>
            <img src={arrowRight} alt="Slide suivante" className="right-arrow" />
          </div>
        </>
      )}
    </div>
  );
}

export default Slider;
