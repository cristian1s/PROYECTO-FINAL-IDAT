import React from "react";

const CancelPayment = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1>Pago cancelado</h1>
      <p>El proceso de pago fue cancelado. Por favor, intente nuevamente.</p>
      <a href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Volver al carrito
      </a>
    </div>
  );
};

export default CancelPayment;
