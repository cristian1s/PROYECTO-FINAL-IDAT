import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          correo,
          contraseña,
          edad: parseInt(edad, 10),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const user = { nombre, apellidos, correo, edad };
        localStorage.setItem("user", JSON.stringify(user));
        onRegister(user);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <form onSubmit={handleRegister} className="mb-3">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row w-full gap-2">
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 w-1/2">
          <label className="block text-sm font-bold mb-2" htmlFor="apellidos">
            Apellidos
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            id="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="correo">
          Correo electrónico
        </label>
        <input
          className="w-full p-2 border rounded"
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="contraseña">
          Contraseña
        </label>
        <input
          className="w-full p-2 border rounded"
          type="password"
          id="contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="edad">
          Edad
        </label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          id="edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-green-500 w-full text-white px-4 py-2 rounded mt-2"
        type="submit"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
