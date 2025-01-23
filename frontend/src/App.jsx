import React, { useState, useEffect } from 'react';
import CVPreview from './components/CVPreview';
import "https://cdn.tailwindcss.com";

const App = () => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    // Obtener datos del backend
    fetch('http://localhost/2daw/M8/Apache_Portfolio_React/cv-project/backend/api.php?id_curriculum=1')
      .then((response) => response.json())
      .then((data) => setCvData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10">
        {cvData ? (
          <CVPreview cvData={cvData} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
};

export default App;
