import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate=useNavigate();
  const userObj={
    "userInfo": {
        "id": 0,
        "first_name": "U",
        "middle_name": "",
        "last_name": "",
        "email": "",
        "contact_no": "",
        "address": "",
        "bank_name": "",
        "account_no": "",
        "ifsc_no": "",
        "job_profile": "",
        "is_admin": "",
        "authentication_token": "",
        "encrypted_salary": "",
        "encrypted_salary_iv": "",
        "created_at": "",
        "updated_at": "",
        "salary": ""
    },
    "total_deduction": 0
};
  const[userInfo,setUserInfo]=useState(userObj);
  useEffect(()=>{
    const userId=localStorage.getItem("userId");
    if(!userId){
      localStorage.clear();
      navigate("/login")
      return
    }
    const user=axios.get(`/user/user_profile/${userId}`)
    .then((response)=>response.data)
    .then((data)=>setUserInfo(data))
    .catch((error)=>console.log(error))
  },[])
  return (
    <Box className="bg-gray-100 px-8 py-4 rounded shadow-lg">
      <Stack direction="row" spacing={2} justifyContent="space-between">
       <Stack direction="row" spacing={2}>
       <Avatar
          sx={{
            backgroundColor: purple[100],
            color: purple[600],
            fontWeight: 600,
          }}
          aria-label="recipe"
        >
          {userInfo.userInfo.first_name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="body1">Name</Typography>
          <Typography variant="body2">{`${userInfo.userInfo.first_name} ${userInfo.userInfo.middle_name} ${userInfo.userInfo.last_name}`}</Typography>
        </Box>
       </Stack>
        <Box
        className="ml-auto"
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Box className="block w-2 h-2 bg-green-600 rounded-full"></Box>
          <Typography variant="h6">{userInfo.userInfo.job_profile}</Typography>
        </Box>
      </Stack>
      <Divider sx={{ marginTop: 2 }} />
      {/* Contact No & Address Row */}
      <Stack
        direction="row"
        sx={{ marginTop: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="column" sx={{textAlign:'left',flex:2,}}>
          <Typography variant="subtitle2">Contact No</Typography>
          <Typography variant="caption">{userInfo.userInfo.contact_no}</Typography>
        </Stack>
        <Stack direction="column" sx={{textAlign:'left',flex:1}}>
          <Typography variant="subtitle2">Address</Typography>
          <Typography variant="caption" sx={{overflowWrap: 'anywhere'}}>{userInfo.userInfo.address}</Typography>
        </Stack>
      </Stack>
      {/* Bank Name & Account No Row */}
      <Stack
        direction="row"
        sx={{ marginTop: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="column" sx={{textAlign:'left',flex:2,}}>
          <Typography variant="subtitle2">Bank Name</Typography>
          <Typography variant="caption" sx={{overflowWrap: 'anywhere'}}>{userInfo.userInfo.bank_name}</Typography>
        </Stack>
        <Stack direction="column" sx={{textAlign:'left',flex:1}}>
          <Typography variant="subtitle2">Account No</Typography>
          <Typography variant="caption">{userInfo.userInfo.account_no}</Typography>
        </Stack>
      </Stack>
      {/* Salary & Deduction */}
      <Stack
        direction="row"
        sx={{ marginTop: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="column" sx={{textAlign:'left',flex:2}}>
          <Typography variant="subtitle2">Salary</Typography>
          <Typography variant="caption">{userInfo.userInfo.salary}</Typography>
        </Stack>
        <Stack direction="column" sx={{textAlign:'left',flex:1}}>
          <Typography variant="subtitle2">Deduction</Typography>
          <Typography variant="caption">{userInfo.total_deduction
          }</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserProfile;
