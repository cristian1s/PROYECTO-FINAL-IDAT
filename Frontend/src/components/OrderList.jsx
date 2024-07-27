import { useState, useEffect } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/orders/user/${user._id}`
          );
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>Por favor inicie sesion para ver sus compras</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Mis Compras</h1>
        <span className="text-xl text-slate-500">
          {user.nombre} {user.apellidos} - {user.correo}
        </span>
      </div>
      <div className="mb-4 mt-4">
        <a
          href="/cart"
          className="bg-white-500 text-slate-500 border-neutral-600 px-2 py-2 border rounded-md mr-4 mb-6"
        >
          Volver al carrito
        </a>
      </div>
      {orders.length === 0 ? (
        <div>
          <p>No tienes compras</p>
          <a
            href="/"
            className="bg-white-500 text-slate-500 border-neutral-600 px-4 py-2 border rounded-md mr-4"
          >
            Seguir comprando
          </a>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-bold mb-2">Compra ID: {order._id}</h2>
              <p>Estado: {order.status}</p>
              <p>Total: S/. {order.total.toFixed(2)}</p>
              <h3 className="text-lg font-bold mt-2 mb-2">Items:</h3>
              <ul className="flex flex-wrap gap-2 ">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="ml-4 bg-slate-300 p-3 rounded-md"
                  >
                    <p>Curso ID: {item.courseId}</p>
                    <p>Vacantes compradas: {item.quantity}</p>
                    <p>Precio: S/. {item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
