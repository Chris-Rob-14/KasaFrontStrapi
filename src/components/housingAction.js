function HousingActions({ onUpdate, onDelete }) {
    return (
      <div>
        <button className = "MAJButton" onClick={() => onUpdate(/* Données nécessaires pour la mise à jour */)}>
          Mettre à jour
        </button>
        <button className = "SupButton" onClick={() => onDelete(/* ID ou autre identifiant nécessaire pour la suppression */)}>
          Supprimer
        </button>
      </div>
    );
  }
  