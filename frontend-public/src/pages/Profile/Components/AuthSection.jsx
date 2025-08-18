

import { useState } from "react"
import { Shield, Key, Smartphone, CheckCircle, AlertTriangle } from "lucide-react"


const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Label = ({ children, className = "", htmlFor, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
)

export default function AuthSection() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Autenticación
        </h1>
        <p className="text-gray-600">Gestiona la seguridad de tu cuenta</p>
      </div>

      {/* Security Status */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Estado de Seguridad</h2>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-600 font-medium">Buena</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-medium text-green-800">Contraseña Fuerte</p>
              <p className="text-sm text-green-600">Actualizada hace 30 días</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-800">2FA Deshabilitado</p>
              <p className="text-sm text-yellow-600">Recomendado activar</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div>
              <p className="font-medium text-green-800">Email Verificado</p>
              <p className="text-sm text-green-600">jonathan@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Key className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
              Contraseña Actual
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                Nueva Contraseña
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
              />
            </div>
          </div>

          <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Actualizar Contraseña
          </Button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Autenticación de Dos Factores</h2>
              <p className="text-gray-600">Agrega una capa extra de seguridad</p>
            </div>
          </div>

          <Button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={`${
              twoFactorEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            } text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            {twoFactorEnabled ? "Deshabilitar" : "Habilitar"} 2FA
          </Button>
        </div>

        {twoFactorEnabled && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium text-green-800">2FA Habilitado</p>
                <p className="text-sm text-green-600">Tu cuenta está protegida con autenticación de dos factores</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login History */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-rose-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gray-100 rounded-xl">
            <Shield className="w-6 h-6 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
        </div>

        <div className="space-y-4">
          {[
            { device: "Chrome en Windows", location: "San Salvador, SV", time: "Hace 2 horas", current: true },
            { device: "Safari en iPhone", location: "San Salvador, SV", time: "Ayer a las 14:30", current: false },
            { device: "Firefox en Windows", location: "San Salvador, SV", time: "Hace 3 días", current: false },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${session.current ? "bg-green-500" : "bg-gray-400"}`} />
                <div>
                  <p className="font-medium text-gray-800">{session.device}</p>
                  <p className="text-sm text-gray-600">
                    {session.location} • {session.time}
                  </p>
                </div>
              </div>
              {session.current && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Sesión Actual
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
