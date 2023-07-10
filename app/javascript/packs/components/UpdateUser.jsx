import React, { useEffect, useLayoutEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  Backdrop,
} from "@mui/material";
import { Person2Outlined, Person } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "./Toast";
import { useNavigate, useParams,useLocation } from "react-router-dom";
const UpdateUser = () => {
    const [open, setOpen] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [userData, setUserData] = React.useState({
      first_name:"",
      last_name:"",
      is_admin:"false"
    });
    const params=useParams();
    const location = useLocation()
    
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();

    useEffect(() => {
      setDisabled(Boolean(location.pathname.includes("/user/show")))
      getUser();
    }, [])
    
    useEffect(() => {
      // reset form with user data
      reset(userData);
  }, [userData]);

    const onSubmit = (data) => {
      updateUser(data)
    };

    const getUser = async () => {
      const user = await axios.get(`/user/${params.id}`)
        .then((res) => res.data)
        .then((data) => {
          setUserData({...data.user})
          setChecked(Boolean(JSON.parse(data.user.is_admin)))
        });
    };
    const updateUser = async (data)=>{
        try {
          setUserData({})
          const user = await axios.put(`/user/${params.id}`,data);
          if(user){
            setOpen(true);
            setTimeout(()=>{
              setOpen(false)
              navigate(`/users`)
            },2000)
        }      
        } catch (error) {
          console.log(error)
        }
      }


  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ></Backdrop>
      <Box className="mt-8">
        <Toast
          msg="User Information Updated"
          open={open}
          setOpen={setOpen}
          title="Success"
          severity="success"
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Stack spacing={2} className="mx-0 sm:mx-8 md:mx-16 mb-4">
            <Box>
              <Typography
                className="font-bold text-lg border-l-4 px-2 border-blue-500 bg-blue-100 max-w-max rounded-sm"
                variant="h6"
              >
                General Information
              </Typography>
              <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
                <TextField
                  label="First Name*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("first_name", {
                    required: "First name is required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only characters are Accepted",
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum length 2 required",
                    },
                  })}
                  error={Boolean(errors.first_name)}
                  helperText={errors.first_name?.message}
                />

                <TextField
                  label="Middle Name*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("middle_name", {
                    required: "Middle name is Required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only characters are Accepted",
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum length 2 required",
                    },
                  })}
                  error={Boolean(errors.middle_name)}
                  helperText={errors.middle_name?.message}
                />
                <TextField
                  label="Last Name*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("last_name", {
                    required: "Last name is required",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Only characters are Accepted",
                    },
                    minLength: {
                      value: 2,
                      message: "Minimum length 2 required",
                    },
                  })}
                  error={Boolean(errors.last_name)}
                  helperText={errors.last_name?.message}
                />
              </Box>
            </Box>
            {/* Second Row */}
            <Box>
              <Typography
                className="font-bold text-lg border-l-4 px-2 mt-4 border-blue-500 bg-blue-100 max-w-max rounded-sm"
                variant="h6"
              >
                Contact Information
              </Typography>
              <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
                <TextField
                  label="Contact No*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }} 
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("contact_no", {
                    required: "Contact no is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are Accepted",
                    },
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 digit Accepted",
                    },
                  })}
                  error={Boolean(errors.contact_no)}
                  helperText={errors.contact_no?.message}
                />
                <TextField
                  label="Email*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("email", {
                    required: "Email no is required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Enter valid Email Address",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Address*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("address", {
                    required: "Address no is required",
                    maxLength: {
                      value: 100,
                      message: "Maximum length Exceeded",
                    },
                  })}
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
              </Box>
            </Box>
            {/* Third Row */}
            <Box>
              <Typography
                className="font-bold text-lg border-l-4 px-2 mt-4 border-blue-500 bg-blue-100 max-w-max rounded-sm"
                variant="h6"
              >
                Bank Information
              </Typography>
              <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
                <TextField
                  label="Bank Name*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("bank_name", {
                    required: "Bank Name is required",
                    pattern: {
                      value: /^[a-zA-Z ]+$/,
                      message: "Only Characters are Accepted",
                    },
                  })}
                  error={Boolean(errors.bank_name)}
                  helperText={errors.bank_name?.message}
                />
                <TextField
                  label="Account No*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("account_no", {
                    required: "Account no is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Enter valid Account No",
                    },
                  })}
                  error={Boolean(errors.account_no)}
                  helperText={errors.account_no?.message}
                />
                <TextField
                  label="IFSC No*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("ifsc_no", { required: "IFSC no is required" })}
                  error={Boolean(errors.ifsc_no)}
                  helperText={errors.ifsc_no?.message}
                />
              </Box>
            </Box>
            {/* Fourth Row */}
            <Box>
              <Typography
                className="font-bold text-lg border-l-4 mt-4 px-2 border-blue-500 bg-blue-100 max-w-max rounded-sm"
                variant="h6"
              >
                Other Information
              </Typography>
              <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
                <TextField
                  label="Job Profile*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("job_profile", {
                    required: "Job Profile no is required",
                  })}
                  error={Boolean(errors.job_profile)}
                  helperText={errors.job_profile?.message}
                />
                <TextField
                  label="Salary*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("salary", {
                    required: "Salary no is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Only numbers are Accepted",
                    },
                  })}
                  error={Boolean(errors.salary)}
                  helperText={errors.salary?.message}
                />
                {/* <TextField
                  label="Password*"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    readOnly: disabled,
                  }}
                  {...register("password", {
                    required: "password is required"}
                  )}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                /> */}
              </Box>
              <Box>
              <FormControl fullWidth>
                  <Box className="flex items-center  p-1 rounded">
                    <FormControlLabel
                      label={
                        <Typography className="text-gray-500">
                          Is Admin
                        </Typography>
                      }
                      control={
                        
                        <Checkbox
                          icon={<Person2Outlined />}
                          checkedIcon={<Person />}
                          disabled={disabled}
                          {...register("is_admin", { required: false })}
                          // checked={userData.is_admin == "true" ? true : false}
                          checked={checked}
                          onChange={()=>setChecked(!checked)}
                        />
                      }
                    />
                  </Box>
                </FormControl>
                
              </Box>
            </Box>
            {/* Submit Button */}
            {!disabled && <Box>
              <Button variant="contained" type="submit">
                Update User
              </Button>
            </Box>
            }
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default UpdateUser;
