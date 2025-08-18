import React, { useState, useContext } from "react";
import {
  User,
  Mail,
  Phone,
  Edit,
  Save,
  X,
  ArrowLeft,
  Fingerprint,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import { AuthContext } from "../../../global/context/AuthContext";

const ProfileSection = () => {
  const navigate = useNavigate(); // Hook para redirigir a otra ruta
  const { loading } = useContext(AuthContext); // Obtener estado de carga desde contexto global
  const [isEditing, setIsEditing] = useState(false); // Estado para editar campos

  // Hook personalizado para manejar formulario y actualización de perfil
  const { register, handleSubmit, updateProfile, isSubmitting, reset } =
    useProfile();

  // Función para enviar los datos al backend y actualizar perfil
  const onSubmit = async (data) => {
    await updateProfile(data);
    setIsEditing(false); // Cerrar modo edición
  };

  // Función para cancelar edición y reiniciar valores
  const handleCancel = () => {
    reset(); // Reinicia los valores desde backend
    setIsEditing(false); // Salir del modo edición
  };

  // Redirige al usuario a la página de recuperación de contraseña
  const handlePasswordClick = () => {
    navigate("/recoveryPassword");
  };

  // Mientras se carga la información del perfil
  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="space-y-8">
      {/* Header de la sección de perfil */}
      <div className="flex flex-wrap mb-1">
        <Link to="/home" className="pt-1">
          <ArrowLeft strokeWidth={2.5} className="cursor-pointer"/>
        </Link>
        <div className="flex flex-col ml-2">
          <h1 className="text-2xl font-semibold">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal</p>
        </div>
      </div>

      {/* Contenedor principal del formulario */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-black/10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl">
            <User className="w-16 h-16 text-white" />
          </div>

          {/* Formulario de información */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Información Personal
              </h2>
              <Button
                onClick={() => {
                  if (isEditing)
                    handleSubmit(
                      onSubmit
                    )(); // Guardar cambios si está en modo edición
                  else setIsEditing(true); // Activar modo edición
                }}
                className={`${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-black hover:bg-neutral-800"
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                disabled={isSubmitting} // Deshabilitar mientras se guarda
                icon={isEditing ? Save : Edit} // Cambiar icono según estado
                text={isEditing ? "Guardar" : "Editar"}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campos de formulario */}
                <Field
                  id="name"
                  label="Nombre"
                  icon={User}
                  disabled={!isEditing}
                  register={register}
                />
                <Field
                  id="surnames"
                  label="Apellidos"
                  icon={User}
                  disabled={!isEditing}
                  register={register}
                />
                <Field
                  id="phone"
                  label="Teléfono"
                  icon={Phone}
                  disabled={!isEditing}
                  register={register}
                />
                <Field
                  id="email"
                  label="Email"
                  icon={Mail}
                  disabled={!isEditing}
                  register={register}
                />
                <Field
                  id="dui"
                  label="DUI"
                  icon={Fingerprint}
                  disabled={!isEditing}
                  register={register}
                />
                <Field
                  id="user"
                  label="Usuario"
                  icon={User}
                  disabled={!isEditing}
                  register={register}
                />

                {/* Contraseña como texto clickeable */}
                <div className="space-y-2">
                  <Label htmlFor="password" text="Contraseña" />
                  <p
                    onClick={handlePasswordClick} // Redirige a recoveryPassword
                    className="h-12 flex items-start cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  >
                    Recuperar contraseña
                  </p>
                </div>
              </div>

              {/* Botones de acción visibles solo en edición */}
              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isSubmitting}
                    icon={Save}
                    text="Guardar Cambios"
                  />
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="border border-gray-300 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    icon={X}
                    text="Cancelar"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente reutilizable para cada campo del formulario
const Field = ({
  id,
  label,
  icon: Icon,
  register,
  disabled,
  type = "text",
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} text={label} />
    <Input
      id={id}
      {...register(id)}
      disabled={disabled} // Deshabilitado si no está en modo edición
      type={type}
      icon={Icon}
      className="h-12 border-gray-300 focus:border-black"
    />
  </div>
);

export default ProfileSection;
