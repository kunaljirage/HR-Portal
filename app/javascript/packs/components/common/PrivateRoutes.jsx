import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

function PrivateRoutes() {
  const auth=localStorage.getItem("authToken")
  const role=JSON.parse(localStorage.getItem("userRole"))
  return (
    (auth && role) ? <><Navbar/><Outlet/></> : !(role) ? <Navigate to="/userProfile"/> : <Navigate to="/login"/>
  );
}

export default PrivateRoutes;