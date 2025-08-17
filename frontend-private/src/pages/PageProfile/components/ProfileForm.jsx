import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  X,
  ArrowLeft,
  BadgeCheck,
  Fingerprint,
} from "lucide-react";
import { useAuth } from "../../../global/hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// Reusable Button
const Button = ({ children, className = "", onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

// Reusable Input
const Input = ({ className = "", ...props }) => (
  <input
    className={`flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Reusable Label
const Label = ({ children, className = "", htmlFor, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

const ProfileSection = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { updateProfile, isSubmitting } = useProfile(user?._id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      surnames: "",
      phone: "",
      email: "",
      dui: "",
      user: "",
      password: "",
    },
  });

  // Cargar valores al tener el usuario
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        surnames: user.surnames || "",
        phone: user.phone || "",
        email: user.email || "",
        dui: user.dui || "",
        user: user.user || "",
        password: user.password || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    await updateProfile(data);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-left lg:text-left">
        <div className="flex flex-wrap mb-1">
          <div className="pt-1">
            <Link to="/home">
              <ArrowLeft strokeWidth={2.5} className="cursor-pointer" />
            </Link>
          </div>
          <div className="flex flex-col ml-2">
            <h1 className="text-2xl font-semibold">Mi Perfil</h1>
            <p className="text-gray-600">Gestiona tu información personal</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-black/10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Formulario */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Información Personal
              </h2>
              <Button
                onClick={() => {
                  if (isEditing) {
                    handleSubmit(onSubmit)();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className={`${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-black hover:bg-neutral-800"
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                disabled={isSubmitting}
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Guardar" : "Editar"}
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field id="name" label="Nombre" icon={<User />} disabled={!isEditing} register={register} />
                <Field id="surnames" label="Apellidos" icon={<User />} disabled={!isEditing} register={register} />
                <Field id="phone" label="Teléfono" icon={<Phone />} disabled={!isEditing} register={register} />
                <Field id="email" label="Email" icon={<Mail />} disabled={true} register={register} />
                <Field id="dui" label="DUI" icon={<Fingerprint />} disabled={true} register={register} />
                <Field id="user" label="Usuario" icon={<User />} disabled={true} register={register} />
                <Field id="password" label="Contraseña" icon={<BadgeCheck />} disabled={true} register={register} />
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Campo reutilizable
const Field = ({ id, label, icon, register, disabled }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
        {icon}
      </div>
      <Input
        id={id}
        {...register(id)}
        disabled={disabled}
        className="pl-10 h-12 border-gray-300 focus:border-black"
      />
    </div>
  </div>
);

export default ProfileSection;
