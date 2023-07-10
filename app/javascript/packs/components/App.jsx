import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
import AddUser from './AddUser'
import UserList from './UserList'
import Header from './Header'
import Navbar from './Navbar'
import { Box, Container } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import UpdateUser from './UpdateUser'
import Deduction from './Deduction'
import Login from './Login'
import PrivateRoutes from './common/PrivateRoutes'
import PublicRoutes from './common/PublicRoutes'
import { setAuthHeaders } from '../api/axios'
import DeductionList from './DeductionList'
import UserProfile from './UserProfile'
import NotFoundPage from './NotFoundPage'
import AddCompany from './AddCompany'

const App = () => {
  const matches = useMediaQuery('(min-width:768px)');
  useEffect(() => {
    setAuthHeaders();
  },[]);
  return (
      <Box className='h-screen w-full flex items-center justify-center'>
       <Router>
        <Container sx={!matches ? {paddingTop:25}:{paddingTop:5}}>
        <Routes>
           <Route element={<PrivateRoutes/>}>
              <Route element={<Home/>} path="/" exact/>
              <Route element={<AddUser/>} path="/add"/>
              <Route element={<UserList/>} path="/users"/>
              <Route element={<UpdateUser/>} path="/user/update/:id"/>
              <Route element={<UpdateUser/>} path="/user/show/:id"/>
              <Route element={<Deduction/>} path="/set_deduction"/>
              <Route element={<DeductionList/>} path="/deduction_list"/>
              <Route element={<AddCompany/>} path="/add_company"/>
           </Route>
           <Route element={<PublicRoutes/>}>
              <Route element={<UserProfile/>} path="/userProfile"/>
              <Route path="/about" element={<About/>}/>
          </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/user/login" element={<Login loginas="user"/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
        </Container>
       </Router>
      </Box>
  )
}

export default App