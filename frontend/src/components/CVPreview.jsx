import React, { useState } from 'react';
import jsPDF from 'jspdf';
import StatsChart from './StatsChart';
import CVForm from './CVForm';

const CVPreview = ({ cvData }) => {
  const { cv_info, interests, languages, habilities, certifications, education, experiences } = cvData;

  // Estado para mostrar u ocultar el formulario
  const [showForm, setShowForm] = useState(false);

  // Función para generar el PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Establecer fuente
    doc.setFontSize(12);
    const headerFontSize = 20;
    const sectionTitleFontSize = 14;
    const regularFontSize = 12;

    // Título del CV
    doc.setFontSize(headerFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Currículum Vitae", 10, 10);

    // Establecer la posición inicial de la página
    let yPosition = 20;

    // Información personal
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Información Personal", 10, yPosition);
    yPosition += 10;

    doc.setFontSize(regularFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${cv_info.name}`, 10, yPosition);
    doc.text(`Correo Electrónico: ${cv_info.email}`, 100, yPosition);
    yPosition += 10;
    doc.text(`Teléfono: ${cv_info.phone}`, 10, yPosition);
    doc.text(`Ubicación: ${cv_info.location}`, 100, yPosition);
    yPosition += 20;

    // Si el contenido excede la página, añadimos nueva página
    const addPageIfNeeded = () => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20; // Reiniciar la posición vertical al inicio
      }
    };

    // Intereses
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Intereses", 10, yPosition);
    yPosition += 10;
    doc.setFontSize(regularFontSize);
    doc.setFont("helvetica", "normal");
    interests.forEach((interest) => {
      doc.text(`- ${interest.name}`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Idiomas
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Idiomas", 10, yPosition);
    yPosition += 10;
    languages.forEach((language) => {
      doc.text(`- ${language.name} (${language.level})`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Habilidades
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Habilidades", 10, yPosition);
    yPosition += 10;
    habilities.forEach((hability) => {
      doc.text(`- ${hability.name} - ${hability.percentage}%`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Certificaciones
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Certificaciones", 10, yPosition);
    yPosition += 10;
    certifications.forEach((certification) => {
      doc.text(`- ${certification.name}`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Educación
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Educación", 10, yPosition);
    yPosition += 10;
    education.forEach((edu) => {
      doc.text(`- ${edu.year} - ${edu.course} en ${edu.location} (${edu.site})`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Experiencia
    doc.setFontSize(sectionTitleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Experiencia", 10, yPosition);
    yPosition += 10;
    experiences.forEach((exp) => {
      doc.text(`- ${exp.year} - ${exp.company} (${exp.profession})`, 10, yPosition);
      yPosition += 10;
      doc.text(`  - Tareas: ${exp.tasks}`, 10, yPosition);
      yPosition += 10;
      addPageIfNeeded();
    });

    // Guardar el PDF
    doc.save("curriculum_vitae.pdf");
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
    setShowForm(false); // Cerrar el formulario después de enviar los datos
  };

  return (
    <div className="bg-gradient-to-r from-gray-200 via-blue-400 to-blue-700 p-4 rounded-lg mt-4 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500">Currículum Vitae</h2>

      {/* Layout en dos columnas con Tailwind CSS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Columna 1 - Información Personal */}
        <div className="bg-gradient-to-r from-blue-100 via-gray-200 to-blue-300 p-6 rounded-lg text-black shadow-lg hover:shadow-2xl transition-all duration-300">
          <h3 className="text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Información Personal</h3>
          <p className="mt-2 text-gray-700 hover:text-gray-600 transition-colors duration-200">
            <strong>Nombre:</strong> {cv_info.name}
          </p>
          <p className="mt-2 text-gray-700 hover:text-gray-600 transition-colors duration-200">
            <strong>Correo Electrónico:</strong> {cv_info.email}
          </p>
          <p className="mt-2 text-gray-700 hover:text-gray-600 transition-colors duration-200">
            <strong>Teléfono:</strong> {cv_info.phone}
          </p>
          <p className="mt-2 text-gray-700 hover:text-gray-600 transition-colors duration-200">
            <strong>Ubicación:</strong> {cv_info.location}
          </p>

          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Intereses</h3>
          <ul className="list-disc pl-5">
            {interests.map((interest) => (
              <li
                key={interest.id_interest}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {interest.name}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Idiomas</h3>
          <ul className="list-disc pl-5">
            {languages.map((language) => (
              <li
                key={language.id_language}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {language.name} ({language.level})
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Habilidades</h3>
          <ul className="list-disc pl-5">
            {habilities.map((hability) => (
              <li
                key={hability.id_hability}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {hability.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 2 - Otros Datos */}
        <div className="bg-gradient-to-r from-blue-100 via-gray-200 to-blue-300 p-6 rounded-lg text-black shadow-lg hover:shadow-2xl transition-all duration-300">
          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Certificaciones</h3>
          <ul className="list-disc pl-5">
            {certifications.map((certification) => (
              <li
                key={certification.id_certification}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {certification.name}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Educación</h3>
          <ul className="list-disc pl-5">
            {education.map((edu) => (
              <li
                key={edu.id_education}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {edu.year} - {edu.course} en {edu.location} ({edu.site})
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-lg font-semibold text-blue-800 hover:text-blue-600 transition-colors duration-200">Experiencia</h3>
          <ul className="list-disc pl-5">
            {experiences.map((exp) => (
              <li
                key={exp.id_experience}
                className="text-gray-700 hover:text-gray-600 transition-colors duration-200"
              >
                {exp.year} - {exp.company} ({exp.profession})
                <br />
                <small className="text-gray-500">{exp.tasks}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <StatsChart habilities={habilities} />
      </div>

      {/* Botón para generar y descargar el PDF */}
      <button
        onClick={generatePDF}
        className="mt-6 px-4 py-2 bg-gradient-to-l from-blue-500 via-green-300 to-red-500 text-white rounded-lg hover:from-blue-600 hover:via-green-400 hover:to-red-600 hover:shadow-lg hover:brightness-150 transition-all duration-300"
      >
        Descargar como PDF
      </button>

      {/* Botón para editar el CV */}
      <button
        onClick={() => setShowForm(true)} // Mostrar el formulario al hacer clic
        className="mt-6 ml-6 px-4 py-2 bg-gradient-to-l from-blue-500 via-green-300 to-red-500 text-white rounded-lg hover:from-blue-600 hover:via-green-400 hover:to-red-600 hover:shadow-lg hover:brightness-150 transition-all duration-300"
      >
        Actualizar CV
      </button>

      <button
        onClick={() => setShowForm(false)} // Mostrar el formulario al hacer clic
        className="mt-6 ml-6 px-4 py-2 bg-gradient-to-l from-blue-500 via-green-300 to-red-500 text-white rounded-lg hover:from-blue-600 hover:via-green-400 hover:to-red-600 hover:shadow-lg hover:brightness-150 transition-all duration-300"
      >
        Cancelar
      </button>

      {/* Mostrar el formulario de actualización si el estado showForm es true */}
      {showForm && <CVForm initialData={cvData} onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default CVPreview;
