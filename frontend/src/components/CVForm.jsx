import React, { useState, useEffect } from 'react';

const CVForm = ({ cvData, idCurriculum }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interests: '',
    languages: '',
    habilities: '',
    certifications: '',
    education: '',
    experiences: '',
  });

  useEffect(() => {
    if (cvData) {
      setFormData({
        name: cvData.cv_info.name || '',
        email: cvData.cv_info.email || '',
        phone: cvData.cv_info.phone || '',
        location: cvData.cv_info.location || '',
        interests: cvData.interests.map(interest => interest.name).join(', ') || '',
        languages: cvData.languages.map(language => language.name).join(', ') || '',
        habilities: cvData.habilities.map(hability => hability.name).join(', ') || '',
        certifications: cvData.certifications.map(cert => cert.name).join(', ') || '',
        education: cvData.education.map(edu => `${edu.year} - ${edu.course} en ${edu.location}`).join(', ') || '',
        experiences: cvData.experiences.map(exp => `${exp.year} - ${exp.company}`).join(', ') || '',
      });
    }
  }, [cvData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/2daw/M8/Apache_Portfolio_React/cv-project/backend/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_curriculum: idCurriculum,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Currículum actualizado exitosamente!');
      } else {
        alert('Error al actualizar el currículum.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al intentar actualizar los datos.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-gray-200 to-blue-300 p-6 rounded-lg text-black shadow-lg">
      <h3 className="text-lg font-semibold text-blue-800">Actualizar Curriculum Vitae</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Intereses, idiomas, habilidades, certificaciones, educación y experiencias */}
        {['interests', 'languages', 'habilities', 'certifications', 'education', 'experiences'].map((section) => (
          <div className="mb-4" key={section}>
            <label className="block mb-2" htmlFor={section}>{section.charAt(0).toUpperCase() + section.slice(1)}</label>
            <input
              type="text"
              id={section}
              name={section}
              value={formData[section]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder={`Escribe tus ${section}`}
            />
          </div>
        ))}

        <button type="submit" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default CVForm;
