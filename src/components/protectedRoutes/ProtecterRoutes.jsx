import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtecterRoutes = ({ redirectPath = "/auth/sign-in" }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(localStorage.getItem("sessionToken"));
  if(isAuthenticate != null){
    if(localStorage.getItem("sessionToken").length <= 0){
      setIsAuthenticate(null);
    }
  }
  return (
    <div>
      {
        isAuthenticate != null ? <Outlet /> : <Navigate to={redirectPath} />
      }
    </div>
  );
};

export default ProtecterRoutes;
