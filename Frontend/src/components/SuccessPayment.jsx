import React, { useState, useEffect, useRef } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineError } from "react-icons/md"; 
const SuccessPayment = () => {
  const hasRun = useRef(false);
  const stateCart = localStorage.getItem("stateCart") || "no pagado";

  useEffect(() => {
    if (hasRun.current) return;
    if (stateCart !== "pagado") return;

    const createOrder = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (user && cart) {
        try {
          const response = await fetch(
            `${import.meta.env.REACT_APP_URI_BACKEND}/api/payments/complete-order`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cart, user }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to complete the order");
          }

          localStorage.removeItem('cart');
          localStorage.removeItem('stateCart');
          // localStorage.removeItem('user');
        } catch (error) {
          console.error("Error completing order:", error);
        }
      }
    };

    createOrder();
    hasRun.current = true;
  }, []);

  return stateCart != "pagado" ? (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <div className="mb-4">
        <MdOutlineError className="text-9xl text-red-500" />
      </div>
      <h1>Pago no completado</h1>
      <p>¡Lo sentimos! Hubo un error en el proceso de pago.</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Volver al inicio
      </a>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <div className="mb-4">
        <IoIosCheckmarkCircle className="text-9xl text-green-500" />
      </div>
      <h1>Pago completado exitosamente</h1>
      <p>¡Gracias por su compra!</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Volver al inicio
      </a>
    </div>
  );
};

export default SuccessPayment;
