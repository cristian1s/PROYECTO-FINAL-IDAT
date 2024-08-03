import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { FaShoppingCart } from "react-icons/fa";


const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const handleRegister = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Por favor inicie sesión o regístrese para continuar con el pago.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_URI_BACKEND}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart, user }),
        }
      );

      if (!response.ok) {
        throw new Error("Fallo al crear la sesión de pago");
      }

      const { url } = await response.json();
      console.log("Redirect Stripe Url:", url);
      if (url) {
        //agregar estado al carrito
        localStorage.setItem("stateCart", "pagado");
        window.location.href = url;
      } else {
        throw new Error("URL de redirección no encontrada");
      }
    } catch (error) {
      setError(
        "Fallo al iniciar el proceso de pago. Por favor, intente nuevamente."
      );
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container mx-auto py-10 flex gap-6">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-4 flex gap-2 items-center"><FaShoppingCart  className="text-3xl mr-2" />Mi Carrito</h1>
        {cart.length === 0 ? (
          <div>
            <p className="mb-4">Tu carrito está vacío.</p>
            <a
              href="/"
              className="bg-white-500 text-slate-500 border-neutral-600 px-4 py-2 border rounded-md mr-4"
            >
              Seguir comprando
            </a>
          </div>
        ) : (
          <div>
            {cart.map((course) => (
              <div
                key={course.id}
                className="flex justify-between items-center mb-4 border border-slate-400 p-4 rounded-lg"
              >
                <div>
                  <h2 className="text-xl font-bold">{course.nombre}</h2>
                  <p>Precio: S/. {course.precio}</p>
                  <p>Vacantes: {course.vacantes}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-slate-400 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateVacantes(course.id, -1)}
                    disabled={course.vacantes <= 1}
                  >
                    <FaMinus />
                  </button>
                  <button
                    className="bg-slate-400 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateVacantes(course.id, 1)}
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="bg-red-400 text-white px-2 py-1 rounded"
                    onClick={() => removeCourse(course.id)}
                  >
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            ))}
            <a
              href="/"
              className="bg-white-500 text-slate-500 border-neutral-600 px-4 py-2 border rounded-md mr-4"
            >
              Seguir comprando
            </a>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Procesando..." : `Pagar S/. ${total.toFixed(2)}`}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </div>
      <div className="w-1/3 pl-4">
        {!user ? (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 rounded-xl px-6 pt-3 pb-2 text-white">
              <h2 className="text-xl font-bold mb-4 text-center">
                Iniciar Sesión
              </h2>
              <LoginForm onLogin={handleLogin} />
            </div>
            {/* <p>Si no tiene una cuenta </p> */}
            <div className="bg-gray-800 rounded-xl px-6 pt-3 pb-2 text-white">
              <h2 className="text-xl font-bold mb-4 text-center">
                Registrarse
              </h2>
              <RegisterForm onRegister={handleRegister} />
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl p-4 text-white ">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenido, {user.nombre}
            </h2>
            <p>Listo para proceder al pago.</p>
            <div className="flex justify-between w-full pt-4">
              <a
                href="/orders"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Mis compras
              </a>
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
