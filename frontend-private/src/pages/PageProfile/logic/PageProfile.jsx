// Lógica para la página de perfil
import React, { useState, useEffect, useContext } from "react";
import { Boxes, DollarSign, User, CircleUser } from "lucide-react";
import PrincipalDiv from "../../../global/components/PrincipalDiv";
import { Link } from "react-router-dom";

const Profile = () => {
  // Cambiar el título de la página al montar el componente
  useEffect(() => {
    document.title = "Profile | Rosé Candle Co.";
  }, []);

  return (
    <PrincipalDiv>
      
    </PrincipalDiv>
  );
};
export default Profile;
