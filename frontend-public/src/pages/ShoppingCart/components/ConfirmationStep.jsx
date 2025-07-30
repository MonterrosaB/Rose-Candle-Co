import { motion } from "framer-motion"
import { CheckCircle, Gift } from "lucide-react"

const ConfirmationStep = ({ isProcessing, orderComplete, processOrder }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center space-y-6"
  >
    {isProcessing ? (
      <div className="space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 border-4 border-[#A3A380] border-t-transparent rounded-full mx-auto"
        />
        <p className="text-lg">Procesando tu pedido...</p>
      </div>
    ) : orderComplete ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="space-y-4"
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold text-green-600">¡Pedido Confirmado!</h2>
        <p className="text-gray-600">Tu pedido ha sido procesado exitosamente</p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-700">
            Número de pedido: <span className="font-mono">#ORD-{Date.now()}</span>
          </p>
        </div>
      </motion.div>
    ) : (
      <div className="space-y-4">
        <Gift className="h-16 w-16 text-[#A3A380] mx-auto" />
        <h2 className="text-xl font-semibold">¿Listo para finalizar?</h2>
        <p className="text-gray-600">Confirma tu pedido para proceder con el pago</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={processOrder}
          className="w-full py-4 bg-gradient-to-r from-[#A3A380] to-[#D2CFCB] text-white font-semibold rounded-lg shadow-lg"
        >
          Confirmar Pedido
        </motion.button>
      </div>
    )}
  </motion.div>
)

export default ConfirmationStep
