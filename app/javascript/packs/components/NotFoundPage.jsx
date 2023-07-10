import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography variant='h2' color="primary" sx={{textAlign:'center'}}>404 <br /> Page Not Found</Typography>
        <Link to="/">Go back to Homepage</Link>
    </Box>
  )
}

export default NotFoundPage