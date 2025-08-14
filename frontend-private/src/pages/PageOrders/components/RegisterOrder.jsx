import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";

import useOrders from "../../PageOrders/hooks/useOrders";

const RegisterOrder = ({ onClose, initialData, onOrderCreated, onOrderUpdated }) => {
  const methods = useForm({ defaultValues: initialData || {} });
  const { register, handleSubmit, errors, createOrder, updateOrder, products } = useOrders(methods);

  const [editingOrderId, setEditingOrderId] = useState(initialData?._id || null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [quantities, setQuantities] = useState(() => {
    if (initialData?.products) {
      return initialData.products.reduce((acc, p) => {
        acc[p.productId] = p.quantity;
        return acc;
      }, {});
    }
    return {};
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        methods.setValue(key, value);
      });
    }
  }, [initialData, methods]);

  // Filtrar productos
  useEffect(() => {
    if (!search.trim()) setFilteredProducts(products);
    else
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, products]);

  // Seleccionar producto
  const selectProduct = (product) => {
    setQuantities((prev) => {
      if (prev[product._id]) return prev;
      return { ...prev, [product._id]: 1 };
    });
    setSearch(product.name);
  };

  // Incrementar/decrementar
  const increment = (id) => setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const decrement = (id) => {
    setQuantities((prev) => {
      if (!prev[id] || prev[id] <= 1) {
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
    const precio = prod.variant?.[0]?.variantPrice ?? prod.currentPrice;
    return acc + qty * precio;
  }, 0);

  const metodosPago = [
    { _id: "credit card", label: "Tarjeta de Crédito" },
    { _id: "paypal", label: "Paypal" },
    { _id: "cash", label: "Efectivo" },
    { _id: "bank transfer", label: "Transferencia" },
  ];

  // Guardar orden (crear o editar)
  const onSubmit = async (data) => {
    try {
      let orderData;

      if (!editingOrderId) {
        // --- Crear cliente mínimo ---
        const customer = await Customers.create({
          name: data.name,
          contact: data.phoneNumber
        });

        // --- Crear carrito vacío ---
        const cart = await ShoppingCart.create({
          idUser: customer._id,
          products: [],
          total: 0,
          status: "active"
        });

        // --- Crear orden ---
        orderData = await SalesOrder.create({
          idShoppingCart: cart._id,
          cliente: data.name,
          paymentMethod: data.paymentMethod,
          address: data.address,
          saleDate: new Date(),
          shippingTotal: 5.0,
          total: total,
          shippingState: [{ state: "Pendiente" }],
          products: Object.entries(quantities).map(([id, quantity]) => ({
            productId: id,
            quantity,
          })),
        });

        if (onOrderCreated) onOrderCreated(orderData);
      } else {
        // Editar orden existente
        orderData = {
          cliente: data.name,
          paymentMethod: data.paymentMethod,
          address: data.address,
          total: total,
          products: Object.entries(quantities).map(([id, quantity]) => ({
            productId: id,
            quantity,
          })),
        };
        const result = await updateOrder(editingOrderId, orderData);
        if (result && onOrderUpdated) onOrderUpdated(result);
      }

      onClose();
    } catch (err) {
      console.error("Error al crear/editar orden:", err);
    }
  };

  return (
    <Form
      headerLabel={editingOrderId ? "Editar Orden" : "Agregar Nueva Orden"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      <FormInputs>
        <div className="flex justify-center items-center gap-4 w-full">
          <Input name="name" label="Nombre" type="text" register={register} errors={errors} />
          <Dropdown name="paymentMethod" label="Método de pago" options={metodosPago} register={register} />
          <Input name="phoneNumber" label="Teléfono" type="text" register={register} />
        </div>

        <input
          type="search"
          placeholder="Buscar Producto..."
          className="w-full p-3 rounded border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto">
          {filteredProducts.map((prod) => {
            const isSelected = quantities[prod._id] > 0;
            return (
              <div
                key={prod._id}
                onClick={() => selectProduct(prod)}
                className={`cursor-pointer p-3 rounded-lg shadow-sm border ${
                  isSelected ? "bg-pink-200" : "bg-pink-50 border-pink-200"
                } hover:shadow-md transition`}
              >
                <img src={prod.images?.[0]} alt={prod.name} className="w-full h-28 object-cover rounded mb-2" />
                <p className="text-center font-semibold">{prod.name}</p>
              </div>
            );
          })}
        </div>

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
                  <img src={prod.images?.[0]} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{prod.name}</p>
                    <p className="text-sm text-gray-600">
                      Precio: ${((prod.variant?.[0]?.variantPrice ?? 0) * (1 - (prod.discount || 0)/100)).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => decrement(id)} className="px-3 py-1 bg-black text-white rounded-lg">-</button>
                  <span className="font-bold text-lg">{qty}</span>
                  <button type="button" onClick={() => increment(id)} className="px-3 py-1 bg-black text-white rounded-lg">+</button>
                </div>
              </div>
            );
          })}
        </div>

        <Input name="address" label="Dirección" type="text" register={register} errors={errors} />

        <h2 className="font-bold text-2xl mt-6">Total: ${total.toFixed(2)}</h2>
      </FormInputs>

      <FormButton>
        <Button buttonText={editingOrderId ? "Guardar Cambios" : "Agregar Orden"} showIcon type="submit" />
      </FormButton>
    </Form>
  );
};

export default RegisterOrder;
