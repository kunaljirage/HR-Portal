import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const PublicRoutes = () => {
  return (
      <><Navbar/><Outlet/></>
  )
}

export default PublicRoutes