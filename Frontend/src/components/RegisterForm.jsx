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
    <form onSubmit={handleRegister} className="mb-3 px-2">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row w-full gap-2">
        <div className="mb-3 w-1/2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 w-1/2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="apellidos"
          >
            Apellidos
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="text"
            id="apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="correo"
        >
          Correo electrónico
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="contraseña"
        >
          Contraseña
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="password"
          id="contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="edad"
        >
          Edad
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="number"
          id="edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between w-full">
        <span></span>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
