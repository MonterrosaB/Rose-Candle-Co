import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react";
import { useAuth } from "../../../global/hooks/useAuth.js";

// Custom components
const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", htmlFor, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export default function ProfileSection() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    surnames: "",
    phone: "",
    email: "",
    addresses: "",
  });

  useEffect(() => {
  if (user) {
    if (!user.phone) {
      // Si phone está vacío, recarga la data completa
      const fetchFullUser = async () => {
        const res = await fetch("http://localhost:4000/api/loginCustomer/verifyCustomer", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.customer);
      };
      fetchFullUser();
    } else {
      // Si sí hay phone, seteas el perfil
      setProfile({
        name: user.name || "",
        surnames: user.surnames || "",
        phone: user.phone || "",
        email: user.email || "",
        addresses: user.addresses || "",
      });
      setLoading(false);
    }
  }
}, [user]);

  const handleSave = () => {
    console.log("Guardar cambios:", profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Perfil
        </h1>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-rose-100">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Información Personal
              </h2>
              <Button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                } text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Guardar" : "Editar"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="surnames"
                  className="text-sm font-medium text-gray-700"
                >
                  Apellidos
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="surname"
                    value={profile.surnames}
                    onChange={(e) =>
                      setProfile({ ...profile, surnames: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 h-12 border-rose-200 focus:border-rose-400 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <Button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
