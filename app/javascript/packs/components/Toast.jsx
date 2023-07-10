import React from "react";
import { Alert, AlertTitle, Box, Button, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Toast = ({open,setOpen,title,msg,severity}) => {
    
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
             <AlertTitle>{title}</AlertTitle>
            {msg}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default Toast;
