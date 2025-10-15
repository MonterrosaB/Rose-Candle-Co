import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Form from "../../../global/components/Form";
import FormInputs from "../../../global/components/FormInputs";
import FormButton from "../../../global/components/FormButton";
import Input from "../../../global/components/Input";
import Dropdown from "../../../global/components/Dropdown";
import Button from "../../../global/components/Button";

import ProductSelector from "./ProductSelector";
import ProductCart from "./ProductCart";

import useOrders from "../../PageOrders/hooks/useOrders";
import InputsInline from "../../../global/components/InputsInline";

const RegisterOrder = ({ onClose, initialData }) => {
  const methods = useForm({
    defaultValues: initialData || { products: [], total: 0 },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: errors,
    updateOrder,
    products,
    createSalesOrderPrivate,
    reset,
  } = useOrders(methods);

  const [editingOrderId] = useState(initialData?._id || null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});

  const productsInForm = watch("products");

  const [quantities, setQuantities] = useState(() => {
    if (initialData?.products) {
      return initialData.products.reduce((acc, p) => {
        acc[p.idProduct] = p.quantity;
        return acc;
      }, {});
    }
    return {};
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    if (initialData?.products) {
      const initialQuantities = {};
      const initialSelectedVariants = {};

      initialData.products.forEach((p) => {
        // si viene selectedVariantIndex en la orden, úsalo
        const varIdx = p.selectedVariantIndex ?? 0;
        const key = `${p.idProduct}-${varIdx}`;

        initialQuantities[key] = p.quantity;
        initialSelectedVariants[p.idProduct] = varIdx;
      });

      setQuantities(initialQuantities);
      setSelectedVariant(initialSelectedVariants);

      // Setear total inicial en el form
      const initialTotal = initialData.products.reduce((acc, p) => {
        const prod = products.find((prod) => prod._id === p.idProduct);
        if (!prod) return acc;
        const variant = prod.variant?.[p.selectedVariantIndex ?? 0];
        const price = variant?.variantPrice ?? prod.currentPrice ?? 0;
        return acc + price * p.quantity;
      }, 0);

      setValue("total", initialTotal);
    }
  }, [initialData, products, setValue]);

  // Filtrar productos
  useEffect(() => {
    if (!search.trim()) setFilteredProducts(products);
    else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  // Actualiza el array `products` del form en base a quantities
  useEffect(() => {
    const formProducts = Object.entries(quantities)
      .map(([key, qty]) => {
        const [prodId, varIdx] = key.split("-");
        const prod = products.find((p) => p._id === prodId);
        if (!prod) return null;
        const variant = prod.variant?.[varIdx];
        const price = variant?.variantPrice ?? prod.currentPrice ?? 0;
        return {
          idProduct: prodId,
          quantity: qty,
          selectedVariantIndex: parseInt(varIdx),
          subtotal: +(price * qty).toFixed(2),
        };
      })
      .filter(Boolean);

    setValue("products", formProducts);

    // Calcular total
    const total = formProducts.reduce((acc, p) => acc + (p.subtotal || 0), 0);
    setValue("total", total);
  }, [quantities, selectedVariant, products, setValue]);

  // Incrementar cantidad
  const increment = (key) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  // Decrementar cantidad
  const decrement = (key) => {
    setQuantities((prev) => {
      const newQty = (prev[key] || 0) - 1;
      if (newQty <= 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: newQty };
    });
  };

  

  // Cuando selecciona producto del grid → abrir modal
  const openVariantSelector = (prod) => {
    setSelectedProduct(prod);
  };

  // Confirmar selección de variante
  const confirmVariantSelection = () => {
    if (!selectedProduct) return;
    const prodId = selectedProduct._id;
    const varIdx = selectedVariant[prodId] ?? 0;
    const key = `${prodId}-${varIdx}`;
    increment(key);
    setSelectedProduct(null); // cerrar modal
  };

  // Calcular total desde el form
  const total =
    watch("products")?.reduce((acc, p) => acc + (p.subtotal || 0), 0) || 0;

  useEffect(() => {
    const total =
      productsInForm?.reduce((acc, p) => acc + (p.subtotal || 0), 0) || 0;
    setValue("total", total); // Guarda el total en el form
  }, [productsInForm, setValue]);

  const metodosPago = [
    { _id: "credit card", label: "Tarjeta de Crédito" },
    { _id: "paypal", label: "Paypal" },
    { _id: "cash", label: "Efectivo" },
    { _id: "bank transfer", label: "Transferencia" },
  ];

  const opcionesEstadoEnvio = [
    { _id: "Pendiente", label: "Pendiente" },
    { _id: "En Proceso", label: "En Proceso" },
    { _id: "Enviado", label: "Enviado" },
    { _id: "Completado", label: "Completado" },
    { _id: "Cancelado", label: "Cancelado" },
  ];

  const onSubmit = async (data) => {
    try {
      if (initialData && initialData._id) {
        //  Actualizar
        await updateOrder(initialData._id, data.shippingState);
        onClose();
      } else {
        const addresses = [
          {
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            default: true,
          },
        ];

        const payload = {
          ...data,
          addresses, // <-- aquí reemplazamos los campos individuales
        };
        //Crear
        await createSalesOrderPrivate(payload);
        onClose();
      }
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
        {initialData && (
          <Dropdown
            name="shippingState"
            label="Estado de Orden"
            options={opcionesEstadoEnvio}
            register={register}
          />
        )}
        <InputsInline>
          <Input
            name="name"
            label="Nombre del cliente"
            type="text"
            register={register}
            errors={errors}
            disabled={initialData}
          />
          <Dropdown
            name="paymentMethod"
            label="Método de pago"
            options={metodosPago}
            register={register}
            disabled={initialData}
          />
        </InputsInline>
        <Input
          name="email"
          label="Correo Electronico"
          type="text"
          register={register}
          disabled={initialData}
        />

        <ProductSelector
          initialData={initialData}
          search={search}
          setSearch={setSearch}
          filteredProducts={filteredProducts}
          quantities={quantities}
          selectedProduct={selectedProduct}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          openVariantSelector={openVariantSelector}
          confirmVariantSelection={confirmVariantSelection}
          setSelectedProduct={setSelectedProduct}
        />

        <ProductCart
          products={products}
          quantities={quantities}
          initialData={initialData}
          increment={increment}
          decrement={decrement}
        />
        <h2 className="font-bold text-2xl mt-6">Total: ${total.toFixed(2)}</h2>


        <h3 className="p-4 text-2xl">Datos de envío</h3>
        <Input
          name="address"
          label="Dirección"
          type="text"
          register={register}
          errors={errors}
          disabled={initialData}
        />
        <div className="space-y-6">
          {/* Formulario de envío */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="firstName"
              label="Nombre"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
            <Input
              name="lastName"
              label="Apellido"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
            <Input
              name="phone"
              label="Teléfono"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              name="state"
              label="Departamento"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
            <Input
              name="city"
              label="Municipio"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
            <Input
              name="zipCode"
              label="Código Postal"
              type="text"
              register={register}
              errors={errors}
              disabled={initialData}
            />
          </div>
        </div>
      </FormInputs>

      <FormButton>
        <Button
          buttonText={editingOrderId ? "Guardar Cambios" : "Agregar Orden"}
          showIcon
          type="submit"
        />
      </FormButton>
    </Form>
  );
};

export default RegisterOrder;
