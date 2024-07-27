import React,{useState, useEffect , useRef} from "react";

const SuccessPayment = () => {
    const hasRun = useRef(false);
  
    useEffect(() => {
      if (hasRun.current) return;
  
      const createOrder = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart'));
  
        if (user && cart) {
          try {
            const response = await fetch('http://localhost:5000/api/payments/complete-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ cart, user }),
            });
  
            if (!response.ok) {
              throw new Error('Failed to complete the order');
            }
  
            localStorage.removeItem('cart');
            // localStorage.removeItem('user');
          } catch (error) {
            console.error('Error completing order:', error);
          }
        }
      };
  
      createOrder();
      hasRun.current = true; 
    }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1>Pago completado exitosamente</h1>
      <p>¡Gracias por su compra!</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Volver al inicio</a>
    </div>
  );
};

export default SuccessPayment;
