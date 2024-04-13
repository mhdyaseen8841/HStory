import  React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
  p: 4,
};


export  function DoctorPopup(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => props.Close();
 const [data, setData] = useState({})
useEffect (()=>{
  console.log(props)
  console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  const myLocalStorageValue = localStorage.getItem('adminInfo');
const myObject = JSON.parse(myLocalStorageValue);
const token = myObject.token;
console.log(props.iIdd)
try{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
}
  axios.post(`${process.env.REACT_APP_API_URL}doctor/getDoctorById`,{id:props.Id},config)

  .then((response) => {
    console.log("huuuuuuuuuuuuuuuuuuuuuuuu99999999999999999777");
    console.log(response);
    setData(response.data);
  })
}catch(err){
  alert("error occured")
  console.log(err);
}
  


},[props])

  return (
    <Modal
    open={props.Open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>

      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
        Doctor Details
      </Typography>
      
      <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar alt="Doctor Image" src={data.Image} sx={{ width: 100, height: 100 }} />
          </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Name:
          </Typography>
          <Typography>
            {data.DocName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Speciality:
          </Typography>
          <Typography>
            {data.Speciality}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Experience:
          </Typography>
          <Typography>
            {data.Experience} years
          </Typography>
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
          Education:
          </Typography>
          <Typography>
          {data.education.map(edu => edu.degree).join(', ')}
          </Typography>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Hospital:
          </Typography>
          <Typography>
            {data.Hospital}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Hospital Address:
          </Typography>
          <Typography>
            {data.HospitalAddress}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Doctor Address:
          </Typography>
          <Typography>
         {data.DocAddress},  {data.City},{data.State}, {data.Zip}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Registration Council:
          </Typography>
          <Typography>
            {data.RegistrationCouncil}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Registration No:
          </Typography>
          <Typography>
            {data.RegistrationNo}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Contact Number:
          </Typography>
          <Typography>
            {data.MobNum}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Email:
          </Typography>
          <Typography>
            {data.DocEmail}
          </Typography>
        </Grid>
      </Grid>
        <Grid item xs={12}  sm={6} pt={3}>
  <Button variant="contained" color="primary" onClick={() => window.open(data.IdentityProof)}>
    View Identity Proof
  </Button>
  <Button  variant="contained" color="primary" onClick={() => window.open(data.MedicalProof)}>
    View Medical Proof
  </Button>
  {/* IdentityProof */}
  {/* MedicalProof */}
</Grid>
      
    </Box>
  </Modal>
  
  );
}