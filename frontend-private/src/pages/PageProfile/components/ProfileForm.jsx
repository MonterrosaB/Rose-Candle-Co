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
  Globe,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import Logs from "./Logs.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import { AuthContext } from "../../../global/context/AuthContext";
import { useTranslation } from "react-i18next";
import "../../../i18n.js"

const ProfileSection = () => {
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, updateProfile, isSubmitting, reset } =
    useProfile();

  const { t, i18n } = useTranslation("profile"); // Manejo de idioma

  // Enviar
  const onSubmit = async (data) => {
    await updateProfile(data);
    setIsEditing(false);
  };

  // Cancelar
  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  // Enviar a recuperar contraseña
  const handlePasswordClick = () => {
    navigate("/recoveryPassword");
  };

  // Cambiar idioma, por defecto español
  const handleLanguageToggle = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  if (loading) return <p>{t("loading")}</p>;

  return (
    <div className="space-y-10 lg:mt-0 sm:mt-12">
      {/* Header */}
      <Link to="/home" className="flex mb-1 items-center w-max">
        <ArrowLeft strokeWidth={2.5} className="cursor-pointer" />
        <h1 className="text-2xl font-semibold ml-2">{t("personal_info")}</h1>
      </Link>

      {/* Avatar, título y botones */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10 mt-8">
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-md">
            <User className="w-16 h-16 text-white" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-800">
              {t("my_profile")}
            </h2>
            <p className="mt-2">{t("manage_info")}</p>
            <a
              href="https://drive.google.com/drive/folders/1L1x21jq8xz6jcsNg1ujzAtLahgPTfswb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800"
            >
              {t("app_manual")}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full lg:w-auto">
          <Button
            onClick={() => {
              if (isEditing) handleSubmit(onSubmit)();
              else setIsEditing(true);
            }}
            className={`${isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-black hover:bg-neutral-800"
              } text-white shadow transition-all duration-300 transform hover:scale-105`}
            disabled={isSubmitting}
            icon={isEditing ? Save : Edit}
            text={isEditing ? t("save") : t("edit")}
          />
          <Button
            onClick={handleLanguageToggle}
            icon={Globe}
            text={t("change_language")}
            className="h-auto border border-gray-300 hover:bg-gray-100 text-gray-700"
          />
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            id="name"
            label={t("name")}
            icon={User}
            disabled={!isEditing}
            register={register}
          />
          <Field
            id="surnames"
            label={t("surnames")}
            icon={User}
            disabled={!isEditing}
            register={register}
          />
          <Field
            id="phone"
            label={t("phone")}
            icon={Phone}
            disabled={!isEditing}
            register={register}
          />
          <Field
            id="email"
            label={t("email")}
            icon={Mail}
            disabled={!isEditing}
            register={register}
          />
          <Field
            id="dui"
            label={t("dui")}
            icon={Fingerprint}
            disabled={!isEditing}
            register={register}
          />
          <Field
            id="user"
            label={t("user")}
            icon={User}
            disabled={!isEditing}
            register={register}
          />

          <div className="space-y-2">
            <Label htmlFor="password" text={t("password")} />
            <p
              onClick={handlePasswordClick}
              className="h-auto flex items-start cursor-pointer text-gray-600 hover:text-gray-800"
            >
              {t("recover_password")}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white shadow transition-all duration-300 transform hover:scale-105"
              disabled={isSubmitting}
              icon={Save}
              text={t("save_changes")}
            />
            <Button
              type="button"
              onClick={handleCancel}
              className="border border-gray-300 hover:bg-gray-50 shadow transition-all duration-300 transform hover:scale-105"
              icon={X}
              text={t("cancel")}
            />
          </div>
        )}
      </form>
      <Logs />
    </div>
  );
};

const Field = ({ id, label, icon: Icon, register, disabled, type = "text" }) => (
  <div className="space-y-2">
    <Label htmlFor={id} text={label} />
    <Input
      id={id}
      {...register(id)}
      disabled={disabled}
      type={type}
      icon={Icon}
      className="h-12 border-gray-300 focus:border-black"
    />
  </div>
);

export default ProfileSection;
