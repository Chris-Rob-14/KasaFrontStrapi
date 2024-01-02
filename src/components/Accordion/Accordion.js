import React from "react";
import "./Accordion.css";
import { useState } from "react";
import down_arrow from '../../images/down_arrow.png';
import up_arrow from '../../images/up_arrow.png';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="accordion-house">
      <div className="item">
        <div className="accordion-house-title" onClick={toggle}>
          <h2>{title}</h2>
          {open ? (
                    <img src={up_arrow} alt='up_arrow' />
                ) : (
                    <img src={down_arrow} alt='down_arrow'  />
                )}
        </div>
        <div className={open ? "accordion-content show" : "accordion-content"}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;