import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ModeEditOutline, Delete, Visibility } from "@mui/icons-material";
import { purple } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import AlertDialogSlide from "./Dailog";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({
    visible: false,
    recordId: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      setOpen(true);
      const userList = await axios
        .get("/user")
        .then((res) => res.data)
        .then((data) => {
          setUsers([...data.users]);
          setOpen(false)
        });
    };
    getUsers();
  }, []);

  const showDailog = (id) => {
    setConfirmDelete({
      visible: true,
      recordId: id,
    });
  };

  const deleteUser = (id) => {
    const user = axios
      .delete(`/user/${id}`)
      .then((response) => response.data)
      .then((data) => setUsers([...data.users]));
  };

  const columns = [
    {
      field: "profile",
      headerName: "Profile",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <CardHeader
          onClick={()=>alert("Hi")}
            avatar={
              <Avatar
                sx={{
                  backgroundColor: purple[100],
                  color: purple[600],
                  fontWeight: 600,
                }}
                aria-label="recipe"
              >
                {params.row.first_name.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={`${params.row.first_name || ""} ${
              params.row.last_name || ""
            }`}
            subheader={params.row.email}
          />
        );
      },
    },
    { field: "address", headerName: "Address", sortable: false, flex: 1 },
    { field: "contact_no", headerName: "Contact No", sortable: false, flex: 1 },

    {
      field: "job_profile",
      headerName: "Job Profile",
      sortable: false, 
      flex: 1
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      colspan: 2, 
      flex: 1,
      renderCell: (params) => {
        return (
          <>
           <IconButton
              aria-label="showRecord"
              color="secondary"
              onClick={() => navigate(`/user/show/${params.id}`)}
            >
              <Visibility />
            </IconButton>
            <IconButton
              aria-label="updateRecord"
              color="primary"
              onClick={() => navigate(`/user/update/${params.id}`)}
            >
              <ModeEditOutline />
            </IconButton>
            <IconButton
              onClick={() => showDailog(params.id)}
              aria-label="deleteRecord"
              color="error"
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];
  const rows = [...users];

  const [open, setOpen] = React.useState(false);

  return (
    <>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        elevation={4}
        variant="elevation"
        className="p-2"
        sx={{ height: 550,width:'60vw',margin:'auto' }}
      >
        <AlertDialogSlide
          title="Confirm Delete"
          msg="Are you sure you want to delete this record ?"
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          deleteUser={deleteUser}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </>
  );
};

export default UserList;
