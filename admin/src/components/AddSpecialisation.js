import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import { TextField } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
    const toast = useToast()
  const [open, setOpen] = React.useState(false);
const [name, setName] = React.useState('');

  const handleClose = () => {
    props.Close()
  };

  const handleSubmit = ()=>{
    if(!name){
        toast({
            title: "Please enter name",
            status: "error",
            duration: 3000,
            isClosable: true,
        })
      return
    }


    const myLocalStorageValue = localStorage.getItem('adminInfo');
const myObject = JSON.parse(myLocalStorageValue);
const token = myObject.token;
console.log(token)
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }

  axios.post(`${process.env.REACT_APP_API_URL}admin/specialization`, {specialised:name},config).then(res=>{
    props.getDoc()
  props.Close()
}).catch(err=>{
    console.log(err)
  toast({
      title: "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
      })
})




}catch(err){

    toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        })
    console.log(err);
    }
   
  }

  return (
    <div>
   
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.Open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Speciality
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           Spacialisation Name
          </Typography>
          <TextField defaultValue={name} onChange={(e)=>setName(e.target.value)}  id="outlined-basic" label="Name" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}