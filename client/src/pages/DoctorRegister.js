import React from 'react'
import Multistep from '../components/DoctorRegister/RegisterForm'
const DoctorRegister = () => {
  const styleObj = { backgroundColor: 'white' };
  return (
    <div style={styleObj}>
      <Multistep/>
    </div>
  )
}

export default DoctorRegister