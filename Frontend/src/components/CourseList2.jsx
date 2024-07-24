import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    categoria: "",
    nombre: "",
    precioMin: 1000,
    precioMax: 5000,
  });

  useEffect(() => {
    fetchCourses();
  }, [sortField, sortOrder, filters]);

  //controlando el blur del campo nombre por js
  const  nombreInputBlur = (event) => {
    const nombre = event.target.value;
    if (nombre.trim().length > 0) {
      handleFilterChange(event);
    }
  };
  const nombreInputChange = (event) => {
    const nombre = event.target.value;
    console.log(nombre);
    // if (nombre.trim().length === 0) {
    //   setFilters((prevState) => {
    //     return { ...prevState, nombre: "" };
    //   });
    // }
  };



  const fetchCourses = () => {
    setLoading(true);
    let url = "http://localhost:5000/api/courses/filter?";
    const queryParams = new URLSearchParams();

    if (filters.categoria) {
      queryParams.append("categoria", filters.categoria);
    }
    if (filters.nombre) {
      queryParams.append("nombre", filters.nombre);
    }
    if (filters.precioMin) {
      queryParams.append("precioMin", filters.precioMin);
    }
    if (filters.precioMax) {
      queryParams.append("precioMax", filters.precioMax);
    }
    // queryParams.append("precioMin", filters.precioMin);
    // queryParams.append("precioMax", filters.precioMax);

    if (sortField) {
      queryParams.append("sortBy", sortField);
      queryParams.append("order", sortOrder);
    }

    url += queryParams.toString();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    setSortField(field);
    setSortOrder(order);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading courses: {error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-6 w-[780px] mx-auto">
      <h1 className="text-3xl font-bold">Cursos</h1>
      {/* <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.nombre}</h2>
            <p>{course.categoria}</p>
            <p>{course.precio}</p>
            <p>{course.vacantes}</p>
          </li>
        ))}
      </ul> */}
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
            onChange={handleFilterChange}
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
            onBlur={nombreInputBlur}
            // ref={nombreInputRef}
            value={filters.nombre}
            // onChange={nombreInputChange}
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
            onChange={handleFilterChange}
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
            value={`${sortField}-${sortOrder}`}
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
      <div className="flex flex-wrap gap-5">
        {courses.map((course) => (
          <div
            key={course._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[380px]"
          >
            <a href="#">
              <img
                className="rounded-t-lg"
                src="/docs/images/blog/image-1.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.nombre}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {/* Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order. */}
                S/. {course.precio}
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
