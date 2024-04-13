import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const toast = useToast()

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {

    if(!name || !password){
      toast({
        title: 'fill all the fields',
        status: 'error',
        isClosable: true,
      })
    }else{
const data={
  "name":name,
  "password":password
}
axios.post(`${process.env.REACT_APP_API_URL}admin/login`,data).then((res)=>{

  if(res.data){
    localStorage.setItem('adminInfo',JSON.stringify(res.data));
   console.log(localStorage.getItem('adminInfo'));
    navigate('/dashboard', { replace: true });

  }else{
    toast({
      title: 'Invalid UserName/Password',
      status: 'error',
      isClosable: true,
    })
  }
}).catch((err)=>{
  console.log(err)
  if(err.response){

    toast({
      title: err.response.data.message,
      status: 'error',
      isClosable: true,
    })
  }else{
    toast({
      title: err.message,
      status: 'error',
      isClosable: true,
    })
  }
})
    }


    // navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="text" label="Name" 
        value={name}
        onChange={(e)=>setName(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          {/* Forgot password? */}
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
