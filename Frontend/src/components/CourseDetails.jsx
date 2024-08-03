import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CiSquareAlert,
  CiClock2,
  CiCalendarDate,
  CiViewTable,
  CiShoppingCart,
} from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_URI_BACKEND}/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const courseExists = cart.some((cartItem) => cartItem.id === course._id);

    if (!courseExists) {
      const courseToAdd = {
        id: course._id,
        nombre: course.nombre,
        precio: course.precio,
        modalidad: course.modalidad,
        categoria: course.categoria,
        vacantes: 1,
      };
      const updatedCart = [...cart, courseToAdd];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      await new Promise((resolve) => setTimeout(resolve, 0));
      navigate("/cart");
    } else {
      navigate("/cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading course details: {error.message}</p>;
  }

  return (
    <div className="px-12 py-6 flex items-center w-full ">
      <div className="flex flex-col gap-6 w-[1000px] mx-auto ">
        <div className="flex justify-between">
          <a
            href="/"
            className="flex items-center p-2 bg-blue-500 text-white rounded-md w-[170px]"
          >
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
              style={{ transform: "rotate(180deg)" }}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            Lista de cursos
          </a>
          <button
            onClick={addToCart}
            className="flex items-center p-2 bg-orange-400 text-white rounded-md w-[180px]"
          >
            <CiShoppingCart className="text-xl mr-2" />
            Quiero Inscribirme
          </button>
        </div>
        <div className="container mx-auto  border border-slate-300 rounded-lg">
          <img
            loading="lazy"
            src={`/img/${course.imagen}.jpg`}
            alt={course.nombre}
            className="w-full h-64 object-cover mr-4 rounded-t-lg fd-trans"
          />
          <div className="p-6">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold mb-8">{course.nombre}</h1>
              <div className="flex flex-row gap-4">
                <span className="border-neutral-600 border rounded-lg p-2 font-bold">
                  {course.categoria}
                </span>
                <span className="border-neutral-600 border rounded-lg p-2 font-bold">
                  {course.modalidad}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5 mb-6">
              <div className="flex gap-2 items-center">
                <CiSquareAlert className="text-4xl" />
                <span className="font-bold text-2xl">
                  {course.descripcion.title}
                </span>
              </div>
              {course.descripcion.descripciones.map((item, index) => (
                <div key={index} className="flex  flex-col gap-2 pl-8">
                  <div className="flex gap-2 items-center ">
                    <IoIosArrowForward className="text-xl" />
                    <span className="font-bold text-lg">{item.title}</span>
                  </div>
                  <div className="pl-6">
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex gap-2 items-center">
                <CiClock2 className="text-4xl" />
                <span className="font-bold text-2xl">Duración</span>
              </div>
              <div className="pl-8">
                <p>{course.duracion} horas académicas </p>
              </div>
            </div>
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex gap-2 items-center">
                <CiCalendarDate className="text-4xl" />
                <span className="font-bold text-2xl">Horarios</span>
              </div>
              <div className="pl-8 flex flex-row flex-wrap gap-6">
                {course.horarios.map((item, index) => (
                  <div
                    key={index}
                    className=" w-[250px] bg-slate-100 rounded-lg flex flex-col gap-2 items-start  p-4"
                  >
                    <div className="flex gap-2 items-center">
                      <IoIosArrowForward className="text-xl" />
                      <span className="font-bold text-xl">{item.inicio}</span>
                    </div>
                    <div className="flex flex-col pl-6">
                      <span className="text-lg">{item.dias}</span>
                      <span>
                        {item.horaInicio} - {item.horaFin}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex gap-2 items-center">
                <CiViewTable className="text-4xl" />
                <span className="font-bold text-2xl">Plan de estudios</span>
              </div>
              <div className="pl-8 flex flex-row flex-wrap gap-6">
                {course.planEstudios.map((item, index) => (
                  <div
                    key={index}
                    className="w-full bg-slate-100 rounded-lg flex flex-row justify-between gap-2  p-4"
                  >
                    <div className="flex gap-2 ">
                      <span className="pt-1">
                        <IoIosArrowForward className="text-xl" />
                      </span>
                      <span className="font-bold text-xl">{item.title}</span>
                    </div>
                    <div className="pl-2">
                      <ul
                        className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8"
                        style={{ listStyle: "disc" }}
                      >
                        {item.competencias.map((competencia, index) => (
                          <li key={index} className="text-sm">
                            {competencia}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <p className="mb-2">Precio: S/. {course.precio}</p> */}
          {/* <p className="mb-2">Vacantes: {course.vacantes}</p> */}
          {/* <p className="mb-4">{course.descripcion}</p> */}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={addToCart}
            className="flex items-center p-2 bg-orange-400 text-white rounded-md w-[180px]"
          >
            <CiShoppingCart className="text-xl mr-2" />
            Quiero Inscribirme
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
