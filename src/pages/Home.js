import React, { useState } from "react";
import Cards from "../components/Cards/Cards";
import AddHousing from "../components/AddHousing/AddHousing";
import "../components/HeroSection/HeroSection.css";
import HeroSectionImage from "../images/HeroSection.png";
import Modal from '../components/Modal/Modal';
import "./css/home.css";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="hero-container">
        <h1>Chez vous, partout et ailleurs</h1>
        <img
          src={HeroSectionImage}
          className="hero-section-image"
          alt="home-background"
        />
      </div>
      <div className = "AddLogementButton"> 
        <button className = "AddLogement" onClick={openModal}>Ajouter un logement</button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddHousing />
        </Modal>
      </div>
      <Cards />
    </>
  );
}

export default Home;