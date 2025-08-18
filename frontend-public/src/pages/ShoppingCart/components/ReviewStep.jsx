import { motion } from "framer-motion"
import { Truck, CreditCard } from "lucide-react"

const ReviewStep = ({ formData, cartItems, total }) => {
  const groupItems = (items) => {
    const grouped = {};
    items.forEach((it) => {
      const key = it._id || it.id || it.name;
      grouped[key] = grouped[key]
        ? { product: it, quantity: grouped[key].quantity + 1 }
        : { product: it, quantity: 1 };
    });
    return Object.values(grouped);
  };

  const groupedItems = groupItems(cartItems);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      {/* Información de envío */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Truck className="h-5 w-5 mr-2" />
          Información de Envío
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{formData.shipping.firstName} {formData.shipping.lastName}</p>
          <p>{formData.shipping.email}</p>
          <p>{formData.shipping.phone}</p>
          <p>{formData.shipping.address}</p>
          <p>{formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}</p>
        </div>
      </div>

      {/* Método de pago */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Método de Pago
        </h3>
        <div className="text-sm text-gray-600">
          {formData.payment.paymentMethod === "card" && (
            <p>Tarjeta terminada en {formData.payment.cardNumber.slice(-4)}</p>
          )}
          {formData.payment.paymentMethod === "paypal" && <p>PayPal</p>}
          {formData.payment.paymentMethod === "transfer" && <p>Transferencia Bancaria</p>}
        </div>
      </div>

      {/* Resumen del pedido */}
      <div className="bg-[#f8f8f4] p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Resumen del Pedido</h3>

        {groupedItems.length ? (
          groupedItems.map(({ product, quantity }) => {
            const key = product._id || product.id || product.name;
            const selectedVariant = product.idProduct?.variant?.[product.selectedVariantIndex]?.variantPrice;
            // 👈 obtener variante


            return (
              <div key={key} className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4">
                <img
                  src={product.idProduct.images?.[0]}
                  alt={product.idProduct?.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col flex-grow">
                  <h4 className="text-md font-semibold text-gray-800">{product.idProduct?.name} - {product.idProduct?.variant?.[product.selectedVariantIndex]?.variant}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Precio unitario: ${parseFloat(selectedVariant || 0).toFixed(2)}
                  </p>
                  <p className="font-semibold text-gray-900 mt-1">
                    Total: ${(quantity * selectedVariant).toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold text-gray-700 text-sm">x{quantity}</div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No hay productos en el carrito.</p>
        )}

        <div className="mt-6 flex justify-between font-bold text-lg border-t pt-4">
          <span>Total</span>
          <span>${parseFloat(total).toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewStep
