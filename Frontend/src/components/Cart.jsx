import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }, []);

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

  return (
    <div className="container mx-auto p-4">
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
                  -
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => updateVacantes(course.id, 1)}
                >
                  +
                </button>
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                  onClick={() => removeCourse(course.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Pagar S/. {total}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
