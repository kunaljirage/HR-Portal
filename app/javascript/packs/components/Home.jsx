import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import axios from 'axios';

const Home = () => {
  const[userCount,setUserCount]=useState(0);
  useEffect(() => {
    const count=axios.get("/user/user_count")
    .then((res) => res.data)
    .then((data) => {
      setUserCount((prev)=>{
        return data.count >= 10 || data.count == 0 ? data.count : `0${data.count}`
      })
    });
  }, [])
  
  return (
    <Box className='p-4 min-h-full w-full'>
      <Card className='w-max p-4 flex flex-col justify-center'>
       <Box className='flex items-center'>
       <CardHeader
       avatar={<Avatar sx={{
        backgroundColor: blue[100],
        color: blue[400],
        fontWeight: 600,
      }}>U</Avatar>}
       />
       <CardContent>
       <Typography variant="h4">
          {userCount}
        </Typography>
       </CardContent>
       </Box>
       <Typography variant="body1" color="text.secondary" className='uppercase text-center'>
         Total Users
        </Typography>      
      </Card>
    </Box>
  )
}

export default Home