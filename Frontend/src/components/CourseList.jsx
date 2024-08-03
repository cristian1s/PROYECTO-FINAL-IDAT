import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    categoria: "",
    nombre: "",
    precioMin: 1000,
    precioMax: 5000,
    sortField: "",
    sortOrder: "asc",
  });

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
    if (filters.sortField) {
      queryParams.append("sortBy", filters.sortField);
      queryParams.append("order", filters.sortOrder);
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

  const handleFilterChange = (updatedFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...updatedFilters,
    }));
  };

  const handleSortChange = (field, order) => {
    setFilters((prevState) => ({
      ...prevState,
      sortField: field,
      sortOrder: order,
    }));
  };

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading courses: {error.message}</p>;
  }

  return (
    <div className="px-12 py-6 flex items-center w-full">
      <div className="flex flex-col gap-6 w-[780px] mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Cursos</h1>
          <a href="/cart"
          className="bottom-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          ><FaShoppingCart  className="text-2xl" /> </a>
        </div>
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <div className="flex flex-wrap gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[380px] pb-8"
            >
              <a href="#">
                <img
                  loading="lazy"
                  src={`/img/${course.imagen}.jpg`}
                  alt={course.nombre}
                  className="w-full h-52 object-cover mr-4 rounded-t-lg fd-trans"
                />
              </a>
              <div className="p-5 flex flex-col">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.nombre}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">
                  {course.categoria}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  S/. {course.precio}
                </p>
                <Link
                  to={`/curso/${course._id}`}
                  className=" absolute bottom-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
