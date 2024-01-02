import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./HouseDetails.css";

function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/housings/${id}?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  useEffect(() => {
    // Assurez-vous d'inclure 'host.avatar' dans votre query pour le peupler
    fetch(`http://localhost:1337/api/housings/${id}?populate=host.avatar`)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  if (!house) return <div>Loading...</div>;

  const { attributes } = house;

  const tags = attributes.tags ? attributes.tags.split(',') : [];
  const host = attributes.host?.data?.attributes;
  const rating = attributes.rating;
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <FaStar key={index} color={rating > index ? "#ff6060" : "#E3E3E3"} />
    ));

      // Construire l'URL de l'avatar
  const avatarUrl = host?.avatar?.data?.attributes?.url
  ? `http://localhost:1337${host.avatar.data.attributes.url}`
  : ''; // Utilisez une URL par défaut ou laissez vide si aucun avatar

  return (
    <div className="house-details-container">
      <div className="house-infos-details">
        <h2 className="house-title">{attributes.title}</h2>
        <span className="house-location">{attributes.location}</span>
        <div className="house-tags">
          {tags.map((tag, index) => (
            <div className="tag" key={index}>
              {tag.trim()}
            </div>
          ))}
        </div>
      </div>
      <div className="house-host-rating">
        {host?.name && (
          <div className="host-infos-container">
            <span className="host-name">{host.name}</span>
            <img
              className="host-profil"
              alt={`Avatar de ${host.name}`}
              src={avatarUrl}
            />
          </div>
        )}
        <div className="host-rating">
          <div className="stars">{stars}</div>
        </div>
      </div>
    </div>
  );
}

export default HouseDetails;

