import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import HouseDetails from "../components/HouseDetails/HouseDetails";
import Accordion from "../components/Accordion/Accordion";
import Modal from "../components/Modal/Modal";
import EditHousingForm from "../components/EditHousingForm/EditHousingForm";

function House() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:1337/api/housings/${id}?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce logement ?"
    );
    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:1337/api/housings/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok)
          throw new Error("Problème lors de la suppression du logement");
        navigate("/"); // Redirigez l'utilisateur vers la page d'accueil ou une autre page appropriée
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  if (!isLoading && !house) {
    return <Navigate to="/404" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const coverImageUrl = house.attributes.cover.data.attributes.url;
  const picturesUrls = house.attributes.pictures.data.map(
    (p) => p.attributes.url
  );

  const sliderImages = [coverImageUrl, ...picturesUrls].map((url) => ({
    original: `http://localhost:1337${url}`,
  }));

  return (
    <div>
      <Slider pictures={sliderImages} />
      <HouseDetails {...house.attributes} />
      <div className="accordion-container">
        <Accordion title="Description">
          {house.attributes.description}
        </Accordion>
        <Accordion title="Equipements">
          {house.attributes.equipments &&
          typeof house.attributes.equipments === "string" ? (
            house.attributes.equipments
              .split(",")
              .map((equipment, index) => (
                <div key={index}>{equipment.trim()}</div>
              ))
          ) : (
            <div>Pas d'équipements à afficher</div>
          )}
        </Accordion>
      </div>
      <div className="LogementButton">
        {/* Boutons Modifier et Supprimer */}
        <button className="AddLogement" onClick={handleEdit}>
          Modifier le logement
        </button>
        <button className="AddLogement" onClick={handleDelete}>
          Supprimer le logement
        </button>
      </div>
      {/* Modal pour la modification */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <EditHousingForm housingId={id} />
        </Modal>
      )}

      {/* Ici, vous pouvez ajouter votre footer ou d'autres composants */}
    </div>
  );
}

export default House;
