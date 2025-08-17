// Lógica para la página de perfil
import React, { useState, useEffect, useContext } from "react";
import { Boxes, DollarSign, User, CircleUser } from "lucide-react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import ProfileForm from "../components/ProfileForm.jsx"

const Profile = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Mi Perfil | Rosé Candle Co.";
  }, []);

  return (
    <PrincipalDiv>
        <ProfileForm/>
    </PrincipalDiv>
  );
};
export default Profile;
