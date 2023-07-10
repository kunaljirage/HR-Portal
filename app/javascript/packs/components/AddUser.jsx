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
  FormHelperText,
  InputAdornment,
  IconButton,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Person2Outlined,
  Person,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "./Toast";

const AddUser = () => {
  const [open, setOpen] = useState(false);
  // const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('');

const matches = useMediaQuery('(min-width:768px)');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("/company")
      .then((res) => res.data)
      .then((data) => {
        setCompanies(data.companies);
      });
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  const onSubmit = (data) => {
    const user_data={...data,"company_id":company};
    console.log("User Data >> ",user_data)
    saveData(user_data);
  };
  const saveData = async (data) => {
    try {
      const user = await axios.post("/user", data);
      if (user) {
        reset();
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box className="mt-8" sx={!matches ? {paddingTop:60}:{paddingTop:5}}>
        <Toast
          msg="User Added"
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
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
                  fullWidth
                  {...register("address", {
                    required: "Address is required",
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
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
                  fullWidth
                  {...register("job_profile", {
                    required: "Job Profile no is required",
                  })}
                  error={Boolean(errors.job_profile)}
                  helperText={errors.job_profile?.message}
                />
                {/* <FormControl sx={{ m: 1, minWidth: 120 }} >
                  <InputLabel id="demo-simple-select-error-label">
                    Job Profile
                  </InputLabel>
                  <Select
                  labelId="demo-simple-select-error-label"
                  label="Job Profile"
                    defaultValue="Job Profile"
                    value="job_profile"
                    error={Boolean(errors.job_profile?.message)}
                    {...register("job_profile", { required: "Select Job Profile" })}
                  >
                    <MenuItem value="job profile" defaultChecked>
                      <em>Job Profile</em>
                    </MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="developer">Developer</MenuItem>
                    <MenuItem value="tester">Tester</MenuItem>
                    <MenuItem value="intern">Intern</MenuItem>
                  </Select>
                  <FormHelperText>{errors.job_profile?.message}</FormHelperText>
                </FormControl> */}
                <TextField
                  label="Salary*"
                  variant="outlined"
                  fullWidth
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
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  
                  {...register("password", {
                    required: "password is required",}
                    )}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                /> */}
                <FormControl variant="outlined" error={Boolean(errors.password)} fullWidth>
                  <InputLabel> Password </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    {...register("password", {
                      required: "password is required",}
                      )}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>
              </Box>
              {/* Is admin */}
              <Box className="flex items-center">
              <FormControl sx={{ m: 1, minWidth: 160 }} error={company == '' ? true : false}>
                <InputLabel id="company_id">Select Company</InputLabel>
                <Select
                  labelId="company_id"
                  name="company_id"
                  value={company}
                  label="Select Company"
                  onChange={handleChange}
                >
                {
                  companies?.map((company,index)=>(
                    <MenuItem key={index} value={company.id}>{company.name}</MenuItem>
                  ))
                }
                </Select>
                <FormHelperText>{company == '' ? "select Company" : null}</FormHelperText>
              </FormControl>
                <FormControl>
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
                          {...register("is_admin", { required: false })}
                        />
                      }
                    />
                  </Box>
                </FormControl>
              </Box>
            </Box>
            {/* Submit Button */}
            <Box>
              <Button variant="contained" type="submit">
                Add User
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddUser;
