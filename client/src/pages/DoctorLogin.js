import React ,{useEffect}from 'react'
import App from '../components/DoctorLogin/App'
import { Navbar } from '../components/miscellaneous/Navbar'
const DoctorLogin = () => {
  const styleObj = { backgroundColor: 'white' };
  useEffect(() => {
    document.title = "Doctor Login"
    if(localStorage.getItem("DoctorInfo")){
      window.location.href="/doctor"
    }
  }, [])
  return (
    <div style={styleObj} >
   
    <App/>
    
    </div>
  )
}

export default DoctorLogin