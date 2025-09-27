import { motion } from "framer-motion";
import { CreditCard, User, Lock } from "lucide-react";

const PaymentStep = ({ formData, handleInputChange }) => {
  // helpers
  const onlyDigits = (s = "") => s.replace(/\D/g, "");

  const detectAmex = (rawDigits) => {
    // Amex empieza por 34 o 37
    return /^3[47]/.test(rawDigits);
  };

  // Formatea el número en bloques de 4 separados por espacios
  const formatCardNumberForDisplay = (value) => {
    const digits = onlyDigits(value).slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumberForDisplay(e.target.value);
    handleInputChange("payment", "cardNumber", formatted);
  };

  const handleExpiryChange = (e) => {
    // Sólo dígitos, máximo 4 (MMYY)
    let digits = onlyDigits(e.target.value).slice(0, 4);
    if (digits.length >= 3) {
      digits = digits.slice(0, 2) + "/" + digits.slice(2);
    }
    handleInputChange("payment", "expiryDate", digits);
  };

  const handleCvvChange = (e) => {
    // Sólo dígitos, máximo 4 (Amex puede necesitar 4)
    const digits = onlyDigits(e.target.value).slice(0, 4);
    handleInputChange("payment", "cvv", digits);
  };

  const isValidExpiry = (expiry) => {
    if (!expiry) return false;
    // validar formato MM/YY
    const m = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m) return false;
    const month = Number(m[1]);
    if (month < 1 || month > 12) return false;
    // (Opcional) podrías validar si ya expiró — aquí sólo comprobamos formato y mes válido.
    return true;
  };

  const isCardValid = () => {
    if (formData.paymentMethod !== "card") return true; // si no es tarjeta, no valida

    const rawNumber = (formData.cardNumber || "").replace(/\s/g, "");
    const isAmex = detectAmex(rawNumber);
    const requiredNumberLength = isAmex ? 15 : 16;
    const numberOk = rawNumber.length === requiredNumberLength;
    const nameOk = (formData.cardName || "").trim() !== "";
    const expiryOk = isValidExpiry(formData.expiryDate || "");
    const cvvDigits = (formData.cvv || "").replace(/\D/g, "");
    const cvvOk = isAmex ? cvvDigits.length === 4 : cvvDigits.length === 3;

    return numberOk && nameOk && expiryOk && cvvOk;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center mb-6">
        {["card"].map((method) => (
          <motion.div
            key={method}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleInputChange("payment", "paymentMethod", method)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === method
                ? "border-[#A3A380] bg-[#A3A380]/10"
                : "border-gray-300 hover:border-[#A3A380]/50"
              }`}
          >
            <div className="text-center">
              {method === "card" && <CreditCard className="h-8 w-8 mx-auto mb-2" />}
              {method === "transfer" && (
                <div className="h-8 w-8 mx-auto mb-2 bg-green-600 rounded" />
              )}
              <p className="text-sm font-medium">{method === "card" && "Tarjeta"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {formData.paymentMethod === "card" && (
        <div className="space-y-4">
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Número de tarjeta"
              value={formData.cardNumber || ""}
              onChange={handleCardNumberChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Nombre en la tarjeta"
              value={formData.cardName || ""}
              onChange={(e) => handleInputChange("payment", "cardName", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="MM/YY"
              value={formData.expiryDate || ""}
              onChange={handleExpiryChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
            />
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="CVV"
                value={formData.cvv || ""}
                onChange={handleCvvChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Ejemplo de uso de isCardValid (puedes usarlo para desactivar el botón siguiente) */}
          <div className="text-sm text-gray-500">
            {isCardValid() ? (
              <span className="text-green-600">Tarjeta válida (formato y campos completos)</span>
            ) : (
              <span className="text-rose-600">
                Completa correctamente número, nombre, fecha (MM/YY) y CVV.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
