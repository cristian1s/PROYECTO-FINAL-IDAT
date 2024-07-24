import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchCourses();
  }, [sortField, sortOrder]);

  const fetchCourses = () => {
    setLoading(true);
    let url = "http://localhost:5000/api/courses";
    if (sortField) {
      url += `?sortBy=${sortField}&order=${sortOrder}`;
    }
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading courses: {error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Courses</h1>
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
      <div className="flex gap-2">
        <div>
          
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
      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[400px]"
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
