import React from "react";
import "./Footer.css";
import K from "../../images/K-letter.png";
import Vector from "../../images/Vector.png";
import S from "../../images/S-letter.png";
import A from "../../images/A-letter.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="logo-image">
          <img src={K} alt="K-letter" className="K-letter" />
          <img src={Vector} alt="Vector" className="Vector" />
          <img src={S} alt="S-letter" className="S-letter" />
          <img src={A} alt="A-letter" className="A-letter" />
        </div>
        <p>© 2022 Kasa. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;