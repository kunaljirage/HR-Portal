import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "./Toast";
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

const AddCompany = () => {
    const [open, setOpen] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // console.log("data >> ",data)
        saveData(data);
      };
      const saveData = async (data) => {
        try {
          const company = await axios.post("/company", data);
          if (company) {
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
        <Box className="mt-8">
            <Toast
            msg="Company Added"
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
                            variant="h6">Company Information</Typography>
                        <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
                            <TextField
                            label="Company Name*"
                            variant="outlined"
                            fullWidth
                            {...register("name", {
                                required: "Comapny name is required",
                                pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only characters are Accepted",
                                },
                                minLength: {
                                value: 2,
                                message: "Minimum length 2 required",
                                },
                            })}
                            error={Boolean(errors.company_name)}
                            helperText={errors.company_name?.message}
                            />

                            <TextField
                            label="Contact No*"
                            variant="outlined"
                            fullWidth
                            {...register("contact_no", {
                                required: "Contact No is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Only numbers are Accepted",
                                }
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
                                }
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                            />
                        </Box>
                        <Box className="flex flex-col gap-4 mt-3 mx-2 md:flex-row">
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
                            <TextField
                                label="Postal Code*"
                                variant="outlined"
                                fullWidth
                                {...register("postal_code", {
                                    required: "Postal Code is required"
                                })}
                                error={Boolean(errors.postal_code)}
                                helperText={errors.postal_code?.message}
                            />
                            <TextField
                                label="Fax*"
                                variant="outlined"
                                fullWidth
                                {...register("fax", {
                                    required: "Fax no is required"
                                })}
                                error={Boolean(errors.fax)}
                                helperText={errors.fax?.message}
                            />
                        </Box>
                        <Box className="mt-3">
                            <Button variant="contained" type="submit">
                                Add User
                            </Button>
                        </Box>
                    </Box>
                </Stack>
            </form>
        </Box>
    </>
  )
}

export default AddCompany