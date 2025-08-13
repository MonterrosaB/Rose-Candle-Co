import { useState, useEffect } from "react";
import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";
import CardProduct from "./CardProduct";

import { useForm } from "react-hook-form";
import useOrders from "../../PageOrders/hooks/useOrders";

const RegisterOrder = ({ onClose }) => {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { createOrder, products } = useOrders(methods);

  // Estado para filtro en búsqueda de producto
  const [search, setSearch] = useState("");

  // Estado para productos filtrados por búsqueda
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  // Estado para cantidades de productos seleccionados
  const [quantities, setQuantities] = useState({});

  // Filtrar productos cada vez que cambia search o products
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  // Función para agregar producto a la selección y llenar el search con su nombre
  const selectProduct = (product) => {
    setQuantities((prev) => {
      if (prev[product._id]) return prev; // Ya está seleccionado
      return { ...prev, [product._id]: 1 };
    });
    setSearch(product.name);
  };
  // Funciones para aumentar o disminuir cantidad
  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => {
      if (!prev[id] || prev[id] <= 1) {
        // Eliminar producto si queda 0 o menos
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  // Calcular total
const total = Object.entries(quantities).reduce((acc, [id, qty]) => {
  const prod = products.find((p) => p._id === id);
  if (!prod) return acc;

  //tomamos el precio de la primera (o la seleccionada)
  const precio = prod.variant?.[0]?.variantPrice ?? prod.currentPrice;

  return acc + qty * precio;
}, 0);


  const metodosPago = [
    { _id: "credit card", label: "Tarjeta de Crédito" },
    { _id: "paypal", label: "Paypal" },
    { _id: "cash", label: "Efectivo" },
    { _id: "bank transfer", label: "Transferencia" },
  ];

  const onSubmit = async (data) => {
  const orderData = {
    idShoppingCart: "ID_DEL_CARRITO",
    paymentMethod: data.paymentMethod,
    address: data.address,
    saleDate: new Date(),
    shippingTotal: 5.0,
    total: total,
    shippingState: "Pendiente",
    products: Object.entries(quantities).map(([id, quantity]) => ({
      productId: id,
      quantity,
    })),
  };

  const newOrder = await createOrder(orderData); // crea en MongoDB

  if (newOrder && onOrderCreated) {
    onOrderCreated(newOrder); // agrega a la lista de PageOrders
  }

  onClose(); // cierra el modal
};


  return (
    <Form headerLabel="Agregar Nueva Orden" onSubmit={handleSubmit(onSubmit)} onClose={onClose}>
      <FormInputs>
        <div className="flex justify-center items-center gap-4 w-full">
          <Input name="name" label="Nombre" type="text" register={register} errors={errors} />
          <Dropdown
            name="paymentMethod"
            label="Método de pago"
            options={metodosPago}
            register={register}
          />
          <Input name="phoneNumber" label="Teléfono" type="number" register={register} />
        </div>

        {/* Input de búsqueda controlado */}
        <input
          type="search"
          placeholder="Buscar Producto..."
          className="w-full p-3 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

{/* Lista de productos filtrados */}
<div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto">
  {filteredProducts.map((prod) => {
    const isSelected = quantities[prod._id] > 0;
    return (
      <div
        key={prod._id}
        onClick={() => selectProduct(prod)}
        className={`cursor-pointer p-3 rounded-lg shadow-sm border ${
          isSelected
            ? "bg-pink-200 pink-200 shadow-md"
            : "bg-pink-50 border-pink-200"
        } hover:shadow-md transition`}
      >
        <img
          src={prod.images?.[0]}
          alt={prod.name}
          className="w-full h-28 object-cover rounded mb-2"
        />
        <p className="text-center font-semibold">{prod.name}</p>
      </div>
    );
  })}
</div>

{/* Productos seleccionados con botones + y - */}
<div className="mt-6">
  {Object.entries(quantities).map(([id, qty]) => {
    const prod = products.find((p) => p._id === id);
    if (!prod) return null;
    return (
      <div
        key={id}
        className="flex items-center justify-between border rounded-lg p-3 mb-3 bg-yellow-50 shadow-sm border-pink-200 gap-5"
      >
        <div className="flex items-center gap-4">
          <img
            src={prod.images?.[0]}
            alt={prod.name}
            className="w-16 h-16 object-cover rounded"
          />
         <div>
  <p className="font-semibold">{prod.name}</p>
  <p className="text-sm text-gray-600">
    Precio: $
    {(
      (prod.variant?.[0]?.variantPrice ?? 0) *
      (1 - (prod.discount || 0) / 100)
    ).toFixed(2)}
  </p>
</div>

        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => decrement(id)}
            className="px-3 py-1 bg-black text-white rounded-lg disabled:opacity-50"
          >
            -
          </button>
          <span className="font-bold text-lg">{qty}</span>
          <button
            type="button"
            onClick={() => increment(id)}
            className="px-3 py-1 bg-black text-white rounded-lg"
          >
            +
          </button>
        </div>
      </div>
    );
  })}
</div>


 
<Input
  name="address"
  label="Dirección"
  type="text"
  register={register}
  errors={errors}
/>


        <h2 className="font-bold text-2xl mt-6">Total: ${total.toFixed(2)}</h2>  </FormInputs>

      <FormButton>
        <Button buttonText="Agregar Orden" showIcon={true} type="submit" />
      </FormButton>
    </Form>
  );
};

export default RegisterOrder;
