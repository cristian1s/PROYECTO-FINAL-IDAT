/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const Filters = ({ filters, onFilterChange, onSortChange }) => {
  const nombreInputRef = useRef(null);

  useEffect(() => {
    if (nombreInputRef.current) {
      if (filters.nombre.trim().length > 0) {
        nombreInputRef.current.focus();
      }
    }
  }, [filters.nombre]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleBlur = (e) => {
    // const nombre = e.target.value;
    // if (nombre.trim().length > 0) {
    //   onFilterChange({ nombre });
    // }
    nombreInputRef.current.blur();
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    onSortChange(field, order);
  };

  return (
    <div className="flex gap-6">
      <div className="max-w-sm mx-auto">
        <label
          htmlFor="categoria"
          className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
        >
          Categoría:
        </label>
        <select
          id="categoria"
          name="categoria"
          onChange={handleInputChange}
          value={filters.categoria}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Todas</option>
          <option value="TECNOLOGIA">Tecnología</option>
          <option value="GESTION">Gestión</option>
          <option value="DISEÑO">Diseño</option>
        </select>
      </div>
      <div className="max-w-sm mx-auto">
        <label
          htmlFor="nombre"
          className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={filters.nombre}
          onChange={handleInputChange}
          onBlur={handleBlur}
          ref={nombreInputRef}
          className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="max-w-sm mx-auto">
        <label
          htmlFor="precioMin"
          className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
        >
          Precio:
        </label>
        <input
          type="range"
          id="precioMin"
          name="precioMin"
          min="1000"
          max="5000"
          value={filters.precioMin}
          onChange={handleInputChange}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        />
        <span>{filters.precioMin}</span>
      </div>
      <div className="max-w-sm mx-auto">
        <label
          htmlFor="sort"
          className="block mb-2 text-sm font-medium dark:text-gray-900 text-white"
        >
          Ordenar por:
        </label>
        <select
          id="sort"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleSortChange}
          value={`${filters.sortField}-${filters.sortOrder}`}
        >
          <option value="">Seleccionar</option>
          <option value="nombre-asc">Nombre (Ascendente)</option>
          <option value="nombre-desc">Nombre (Descendente)</option>
          <option value="precio-asc">Precio (Ascendente)</option>
          <option value="precio-desc">Precio (Descendente)</option>
          <option value="vacantes-asc">Vacantes (Ascendente)</option>
          <option value="vacantes-desc">Vacantes (Descendente)</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
