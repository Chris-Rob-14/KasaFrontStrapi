import React from "react";
import DataAbout from "../data/dataAbout.json";
import Accordion from "../components/Accordion/Accordion";
import "../components/HeroSection/HeroSection.css";
import HeroSectionAboutImage from "../images/HeroSectionAbout.png";

function About() {
  return (
    <div>
      <div className="img-hero-section-about">
        <img
          src={HeroSectionAboutImage}
          className="hero-section-image"
          alt="about-background"
        />
      </div>
      <div className="accordion-about-container">
        {DataAbout.map((dataAbout) => {
          return (
            <div className="accordion-about" key={dataAbout.id}>
              <Accordion title={dataAbout.title}>{dataAbout.content}</Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
