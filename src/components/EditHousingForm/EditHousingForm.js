import React, { useState, useEffect } from 'react';

function EditHousingForm({ housingId }) {
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

// Charger les données existantes du logement lors de l'initialisation du formulaire
useEffect(() => {
  const fetchHousingData = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/housings/${housingId}?populate=*`);
      const data = await response.json();
      setHousingData(data.data.attributes); // Assurez-vous que cette ligne correspond à la structure de votre réponse
    } catch (error) {
      console.error('Error fetching housing data:', error);
    }
  };

  fetchHousingData();
}, [housingId]);

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

    // Pour gérer l'envoi de fichiers
    const formData = new FormData();
    formData.append('data', JSON.stringify({ ...housingData, id: undefined })); // Exclure l'ID des données
    if (housingData.cover instanceof File) {
      formData.append('files.cover', housingData.cover, housingData.cover.name);
    }
    if (housingData.pictures.length) {
      housingData.pictures.forEach((picture, index) => {
        if (picture instanceof File) { // Vérifiez si l'image est un fichier avant de l'ajouter
          formData.append(`files.pictures`, picture, picture.name);
        }
      });
    }

    try {
      const response = await fetch(`http://localhost:1337/api/housings/${housingId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data);
      // Affichez un message de succès ou redirigez l'utilisateur
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        placeholder="Location"
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
      <button type="submit">Modifier logement</button>
    </form>
  );
}

export default EditHousingForm;

