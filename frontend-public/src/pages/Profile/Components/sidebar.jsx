import { useState } from "react";
import {
  User,
  MapPin,
  CreditCard,
  Shield,
  Package,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../../global/hooks/useAuth.js";

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const menuItems = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "direcciones", label: "Direcciones", icon: MapPin },
  { id: "autenticacion", label: "Autenticación", icon: Shield },
  { id: "pedidos", label: "Pedidos", icon: Package },
];

export default function Sidebar({ activeSection, setActiveSection }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/80 backdrop-blur-sm border-rose-200 hover:bg-rose-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white/90 backdrop-blur-xl border-r border-rose-100 
        shadow-2xl shadow-rose-100/50 z-40 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Cuenta
            </h1>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl border border-rose-200/50 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                {user ? (
                  <h2 className="text-xl font-semibold text-gray-800">
                    ¡Hola! {user.name} {user.surnames}
                  </h2>
                ) : (
                  <p className="text-gray-500">Cargando...</p>
                )}
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-300 ease-in-out group relative overflow-hidden
                    ${isActive
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 transform scale-105"
                      : "text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:transform hover:scale-105"
                    }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-all duration-300
                    ${isActive
                        ? "bg-white/20"
                        : "bg-rose-100 group-hover:bg-rose-200"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? "text-white" : "text-rose-600"
                        }`}
                    />
                  </div>
                  <span className="font-medium">{item.label}</span>

                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-rose-100">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group">
              <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
