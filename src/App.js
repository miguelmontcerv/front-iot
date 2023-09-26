import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/python.png';

function App() {
  const [formData, setFormData] = useState({
    alumno: '', // Cambiado de "alumno" a "nombre"
    opinion: '',
    calificacion: '' // Cambiado a una cadena vacía
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Si es un campo de tipo checkbox, convierte el valor a booleano
    const fieldValue = type === 'checkbox' ? checked : value;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la petición a la API
    fetch('https://dicomate-test.azurewebsites.net/api/opiniones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // La respuesta de la API estará en la variable "data"
      console.log(data["Response"]);
      // Mostrar la notificación con el retorno
      toast.success(`Evaluación registrada!: ${data["Response"]}`);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
      // Mostrar una notificación de error
      toast.error('Error en la petición. Inténtalo de nuevo.');
    });
  };
  

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Alumno:
          <input
            type="text"
            name="alumno"
            value={formData.alumno}
            onChange={handleChange}
          />
        </label>
        <label>
          Opinión:
          <input
            type="text"
            name="opinion"
            value={formData.opinion}
            onChange={handleChange}
          />
        </label>
        <label>
          Calificación (0-10):
          <input
            type="number" // Cambiado a type="number"
            name="calificacion"
            value={formData.calificacion}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Evaluar!</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
