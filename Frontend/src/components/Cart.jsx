import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // useEffect(() => {
  //   // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   // setCart(storedCart);
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if (storedUser) {
  //     setUser(storedUser);
  //   }
  // }, []);

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }, [cart]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = () => {
    const totalAmount = cart.reduce(
      (acc, course) => acc + course.precio * course.vacantes,
      0
    );
    setTotal(totalAmount);
  };

  const updateVacantes = (id, delta) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((course) =>
        course.id === id
          ? { ...course, vacantes: course.vacantes + delta }
          : course
      );
      return updatedCart;
    });
  };

  const removeCourse = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((course) => course.id !== id);
      return updatedCart;
    });
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Debes iniciar sesión para proceder al pago.");
      return;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-4">Carrito</h1>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div>
            {cart.map((course) => (
              <div
                key={course.id}
                className="flex justify-between items-center mb-4 border p-4 rounded"
              >
                <div>
                  <h2 className="text-xl font-bold">{course.nombre}</h2>
                  <p>Precio: S/. {course.precio}</p>
                  <p>Vacantes: {course.vacantes}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateVacantes(course.id, -1)}
                    disabled={course.vacantes <= 1}
                  >
                    <FaMinus />
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateVacantes(course.id, 1)}
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                    onClick={() => removeCourse(course.id)}
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleCheckout}
            >
              Pagar S/. {total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
      <div className="w-1/3 pl-4">
        {!user ? (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-200 rounded-xl px-4 pt-3 pb-2 ">
              <h2 className="text-xl font-bold mb-4 text-center">
                Iniciar Sesión
              </h2>
              <LoginForm onLogin={handleLogin} />
            </div>
            {/* <p>Si no tiene una cuenta </p> */}
            <div className="bg-slate-200 rounded-xl px-4 pt-3 pb-2 ">
              <h2 className="text-xl font-bold mb-4 text-center">
                Registrarse
              </h2>
              <RegisterForm onRegister={handleRegister} />
            </div>
          </div>
        ) : (
          <div className="bg-slate-200 rounded-xl p-4 ">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenido, {user.nombre}
            </h2>
            <p>Listo para proceder al pago.</p>
            <div className="flex justify-between w-full">
              <span></span>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
                onClick={handleLogout}
              >
                Cerrar Sesion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
