import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { palette } from '@mui/system';
import Toast from './Toast';

const Login = ({}) => {
  const [open, setOpen] = React.useState({isOpen:false,msg:""});
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    const navigate=useNavigate();
      const onSubmit =async (data) => {
        const payload = {
            // email: 'sample@sample.com',
            email: data.email,
            password: data.password,
          };
        try {
            const { data : { user }, } = await axios.post('/users/sign_in', { user : payload } );
            localStorage.setItem('authToken', JSON.stringify(user.authentication_token));
            localStorage.setItem('authEmail', JSON.stringify(user.email));
            localStorage.setItem('userId', JSON.stringify(user.id));
            localStorage.setItem('userRole', user.is_admin);
            // console.log(">> is admin",user.is_admin)
            // console.log(">>>> convert",Boolean(user.is_admin))
            // console.log(typeof Boolean(JSON.parse(user.is_admin)))
            Boolean(JSON.parse(user.is_admin)) ? navigate("/") : navigate("/userProfile") ;
            
        } catch (error) {
            // console.log("error",error.response.data)
              reset();
              setOpen({isOpen:true,msg:error.response.data.error});
              setTimeout(() => {
                setOpen(false);
              }, 3000);
            
        }
      };
      useEffect(() => {
        const auth=localStorage.getItem("authToken")
        if(auth){
          navigate("/")
        }
      }, [])
      
    
  return (
    <>
    <Toast
          msg={open.msg}
          open={open.isOpen}
          setOpen={setOpen}
          title="Invalid Credentials"
          severity="error"
        />
    <Box sx={{margin:'auto',minWidth:'400px',maxWidth:'600px',}}>
      <Typography component="h1" variant="h5">Welcome to <Typography component="span" variant="h5" sx={{color:'#1976d2'}}>HR PORTAL</Typography></Typography>
      <Typography componentx="h1" variant="subtitle2">Enter your credentials & continue your journey...</Typography>
    </Box>
    <Paper sx={{maxWidth:'600px',minWidth:'400px',padding:'12px 20px',margin:'auto',marginTop:3}} elevation={4}>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              {...register("email", {
                required: "Email is required"})}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required"})}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
        </Box>
    </Paper>
    </>
  )
}

export default Login