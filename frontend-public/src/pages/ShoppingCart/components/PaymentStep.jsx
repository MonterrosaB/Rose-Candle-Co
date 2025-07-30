import { motion } from "framer-motion"
import { CreditCard, User, Lock } from "lucide-react"

const PaymentStep = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {["card", "paypal", "transfer"].map((method) => (
        <motion.div
          key={method}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleInputChange("payment", "paymentMethod", method)}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            formData.paymentMethod === method
              ? "border-[#A3A380] bg-[#A3A380]/10"
              : "border-gray-300 hover:border-[#A3A380]/50"
          }`}
        >
          <div className="text-center">
            {method === "card" && <CreditCard className="h-8 w-8 mx-auto mb-2" />}
            {method === "paypal" && <div className="h-8 w-8 mx-auto mb-2 bg-blue-600 rounded" />}
            {method === "transfer" && <div className="h-8 w-8 mx-auto mb-2 bg-green-600 rounded" />}
            <p className="text-sm font-medium">
              {method === "card" && "Tarjeta"}
              {method === "paypal" && "PayPal"}
              {method === "transfer" && "Transferencia"}
            </p>
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
            placeholder="Número de tarjeta"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Nombre en la tarjeta"
            value={formData.cardName}
            onChange={(e) => handleInputChange("payment", "cardName", e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/AA"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange("payment", "expiryDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
          />
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A3A380] focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
    )}
  </div>
)

export default PaymentStep
