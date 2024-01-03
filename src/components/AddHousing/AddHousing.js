import React, { useState } from 'react';
import "../Modal/Modal.css";

function AddHousingForm() {
  const [housingData, setHousingData] = useState({
    title: '',
    location: '',
    cover: null,
    pictures: [],
    description: '',
    equipments: '',
    tags: '',
    host: '13',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHousingData({ ...housingData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "cover") {
      setHousingData({ ...housingData, cover: files[0] });
    } else {
      setHousingData({ ...housingData, [name]: Array.from(files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Préparer les données JSON pour les champs non-fichiers
    const jsonFields = {
      title: housingData.title,
      location: housingData.location,
      description: housingData.description,
      rating: housingData.rating,
      equipments: housingData.equipments,
      tags: housingData.tags,
      host: housingData.host ? { id: housingData.host } : null,
    };
  
    formData.append('data', JSON.stringify(jsonFields));
  
    // Ajouter les fichiers pour 'cover' et 'pictures'
    if (housingData.cover) {
      formData.append('files.cover', housingData.cover, housingData.cover.name);
    }
    if (housingData.pictures.length) {
      housingData.pictures.forEach((picture, index) => {
        formData.append(`files.pictures`, picture, picture.name);
      });
    }
  
    try {
      const response = await fetch('http://localhost:1337/api/housings', {
        method: 'POST',
        body: formData,
        // Si vous avez besoin de headers spécifiques pour l'authentification ou autre, ajoutez-les ici
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error.message}`);
      }
      const data = await response.json();
      console.log(data);
      // Gérer la réponse ici, par exemple rediriger l'utilisateur ou afficher un message de succès
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  

  return (
    <form className = "form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={housingData.title}
        onChange={handleChange}
        placeholder="Titre"
      />
      <input
        type="text"
        name="location"
        value={housingData.location}
        onChange={handleChange}
        placeholder="Localisation"
      />
      <input
        type="file"
        name="cover"
        onChange={handleFileChange}
      />
      <input
        type="file"
        name="pictures"
        onChange={handleFileChange}
        multiple
      />
      <textarea
        name="description"
        value={housingData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      {/* Pour les équipements et les tags, envisagez d'utiliser des sélecteurs multiples ou des champs de texte séparés */}
      <input
        type="text"
        name="equipments"
        value={housingData.equipments}
        onChange={handleChange}
        placeholder="Equipements"
      />
      <input
        type="text"
        name="tags"
        value={housingData.tags}
        onChange={handleChange}
        placeholder="Tags"
      />
      <input
        type="text"
        name="host"
        value={housingData.host}
        onChange={handleChange}
        placeholder="Hote"
      />
      <button type="submit">Ajouter logement</button>
    </form>
  );
}

export default AddHousingForm;

