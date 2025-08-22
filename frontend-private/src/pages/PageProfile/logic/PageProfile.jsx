import React, { useEffect } from "react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import ProfileForm from "../components/ProfileForm.jsx";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t, i18n } = useTranslation("profile");

  useEffect(() => {
    document.title = `${t("document_title")} | Rosé Candle Co.`;
  }, [t, i18n.language]); // Ejecuta cada vez que cambia el idioma

  return (
    <PrincipalDiv>
      <ProfileForm />
    </PrincipalDiv>
  );
};

export default Profile;
