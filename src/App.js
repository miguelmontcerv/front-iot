//Signin.js
import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/python.png';

function App() {
  const [formData, setFormData] = useState({
    alumno: '',
    opinion: '',
    calificacion: 0
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
    fetch('https://cloudvitals.azurewebsites.net/api/signin', {
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
      console.log(data);
      // Mostrar la notificación con el retorno
      toast.success(`Evaluación registrada!: ${data}`);
    })
    .catch(error => {
      console.error('Error en la petición:', error);
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
            name="nombre"
            value={formData.nombre}
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
            type="number"
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