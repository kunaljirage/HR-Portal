import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "./Toast";
import ListIcon from '@mui/icons-material/List';
import { Link } from "react-router-dom";
import { Article } from "@mui/icons-material";

const Deduction = () => {
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [jobProfile, setJobProfile] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("/user/job_profiles")
      .then((res) => res.data)
      .then((data) => {
        setProfiles(data.job_profiles);
      });
  }, []);


  const handleChange = (event) => {
    setJobProfile(event.target.value);
  };

  const onSubmit = async (data) => {
    const payroll_data={...data,"job_profile":jobProfile};
    console.log("Form Data >> ",payroll_data)
    if(payroll_data.job_profile && payroll_data.job_profile != '')
    {
      // console.log("form data >> ",payroll_data)
        try {
        const deductions = await axios.post("/deduction", payroll_data);
        if (deductions) {
          reset();
          setJobProfile('')
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        }
        } catch (error) {
          console.log(error);
        }
    }else{
      console.log("Job Profile Required")
    }
  };
  const handleMonthChange = (event) => {
    console.log("change month >> ",event.target.value)
  }
  return (
    <Box>
      <Toast
          msg="Deduction Set"
          open={open}
          setOpen={setOpen}
          title="Success"
          severity="success"
        />
        <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
        <Link to="/deduction_list">
            <Button variant="text" startIcon={<Article/>} sx={{alignSelf:'flex-end'}}>Payroll List</Button>
        </Link>
        </Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Typography
        className="font-bold text-lg border-l-4 px-2 border-blue-500 bg-blue-100 max-w-max rounded-sm"
        variant="h6"
        >
        Payroll
      </Typography>
      <Box sx={{ marginTop: 2 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Job Profile</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={jobProfile}
          label="Job Profile"
          onChange={handleChange}
        >
         {
          profiles.map((profile,index)=>(
            <MenuItem key={index} value={profile}>{profile}</MenuItem>
          ))
         }
        </Select>
        <FormHelperText>{errors.job_profile?.message}</FormHelperText>
      </FormControl>
      <TextField
        sx={{ m: 1, minWidth: 120 }}
        type="month"
        {...register("payroll_month", { required: "month is require"})}
        error={Boolean(errors.payroll_month)}
        helperText={errors.payroll_month?.message}
      />
      </Box>
      <Typography
        className="font-bold text-lg border-l-4 px-2 border-blue-500 bg-blue-100 max-w-max rounded-sm"
        variant="h6"
        >
        Set Allowances
      </Typography>
      <Box className="flex flex-col gap-4 mt-3 md:flex-row">
        <TextField
          label="House Rent Allowances"
          variant="outlined"
          fullWidth
          {...register("house_rent_allowances", { required: false})}
          error={Boolean(errors.deduction_one)}
          helperText={errors.deduction_one?.message}
        />
        <TextField
          label="Conveyance Allowances"
          variant="outlined"
          fullWidth
          {...register("conveyance_allowances", { required:false})}
        />
        <TextField
          label="Medical Allowances"
          variant="outlined"
          fullWidth
          {...register("medical_allowances", { required:false})}
        />
        <TextField
          label="Special Allowances"
          variant="outlined"
          fullWidth
          {...register("spcial_allowances", { required:false})}
        />
      </Box>
      <Typography
        sx={{ marginTop: 2 }}
        className="font-bold text-lg border-l-4 px-2 border-blue-500 bg-blue-100 max-w-max rounded-sm"
        variant="h6"
        >
        Set Deductions
      </Typography>
      <Box className="flex flex-col gap-4 mt-3 md:flex-row">
        <TextField
          label="EPF"
          variant="outlined"
          fullWidth
          {...register("epf_deduction", { required: false})}
          error={Boolean(errors.deduction_one)}
          helperText={errors.deduction_one?.message}
        />
        <TextField
          label="Health Insurance"
          variant="outlined"
          fullWidth
          {...register("health_insurance_deduction", { required:false})}
        />
        <TextField
          label="Professional Tax"
          variant="outlined"
          fullWidth
          {...register("professional_tax_deduction", { required:false})}
        />
        <TextField
          label="TDS"
          variant="outlined"
          fullWidth
          {...register("tds_deduction", { required:false})}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
      <Button variant="contained" type="submit">Submit</Button>
      </Box>
      </form>
    </Box>
  );
};

export default Deduction;
