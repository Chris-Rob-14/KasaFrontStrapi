import React, { useEffect, useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

function Cards() {
  const [data, setData] = useState([]); // Initialisation d'un état pour stocker les données des logements

  useEffect(() => {
    // Effectuer la requête HTTP pour récupérer les données de l'API Strapi
    fetch("http://localhost:1337/api/housings?populate=*") // Assurez-vous que l'URL correspond à votre configuration Strapi
      .then((response) => response.json())
      .then((data) => {
        // Assurez-vous que le chemin d'accès aux données correspond à la réponse de votre API Strapi
        setData(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []); // Le tableau vide assure que l'effet s'exécute une seule fois après le premier rendu

  return (
    <div className="card-container">
      <ul className="card-list">
        {data.map((item) => {
          // Assurez-vous que les chemins d'accès aux attributs correspondent à ceux de votre API Strapi
          const imageUrl = item.attributes.cover.data ? 
            `http://localhost:1337${item.attributes.cover.data.attributes.url}` : 
            'path_to_default_image'; // Remplacez 'path_to_default_image' par un chemin d'accès à une image par défaut

          return (
            <li className="card-item" key={item.id}>
              <Link to={`/house/${item.id}`} className="house-link">
                <img src={imageUrl} alt={item.attributes.title} className="house-image" />
                <div className="card-info">
                  <h4 className="item-title">{item.attributes.title}</h4>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Cards;
