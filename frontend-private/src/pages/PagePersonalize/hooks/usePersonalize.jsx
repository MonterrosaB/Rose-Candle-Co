import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../global/context/AuthContext";

export const usePersonalize = () => {
  const { user, API } = useContext(AuthContext);
  const ApiSettings = API + "/settings"; // API para Settings

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      marquee: "",
      bannerTitle: "",
      bannerSubtitle: "",
      bannerImage: null, // Para manejar la imagen del banner
      emailSubject: "",
      emailBody: "",
    },
  });

  // Obtener la configuración desde la base de datos
  const getSettings = async () => {
    try {
      const res = await fetch(ApiSettings);
      if (!res.ok) throw new Error("Error al cargar la configuración");
      const data = await res.json();
      reset({
        marquee: data.marquee || "",
        bannerTitle: data.banner?.title || "",
        bannerSubtitle: data.banner?.subtitle || "",
        emailSubject: data.email?.subject || "",
        emailBody: data.email?.body || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("No se pudo cargar la configuración");
    }
  };

  // Actualizar la configuración (Marquee, Banner, Email)
  const updateSettings = async (data) => {
    try {
      // FormData para manejar la imagen del banner si es necesario
      const formData = new FormData();
      formData.append("marquee", data.marquee);
      formData.append("bannerTitle", data.bannerTitle);
      formData.append("bannerSubtitle", data.bannerSubtitle);
      formData.append("emailSubject", data.emailSubject);
      formData.append("emailBody", data.emailBody);

      if (data.bannerImage && data.bannerImage[0]) {
        formData.append("bannerImage", data.bannerImage[0]);
      }

      const res = await fetch(ApiSettings, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al actualizar la configuración");
      toast.success("Configuración actualizada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar los cambios");
    }
  };

  useEffect(() => {
    getSettings();
  }, []); // Cargar la configuración solo una vez cuando el componente se monte

  return {
    register,
    handleSubmit,
    updateSettings,
    isSubmitting,
    reset,
    setValue, // Para cambiar valores del formulario si es necesario
  };
};
