import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({title,msg,confirmDelete,setConfirmDelete,deleteUser}) {


  const handleClose = () => {
    setConfirmDelete({
        visible:false,
        recordId:null
    });
  };
  const handleDelete = () => {
    deleteUser(confirmDelete.recordId)
    setConfirmDelete({
      ...confirmDelete,
        visible:false,
  });
  };

  return (
    <div>
      <Dialog
        open={confirmDelete.visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} variant='contained'>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}