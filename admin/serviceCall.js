import axios from "axios";
import Router from 'next/router';



const requestPost = async (ServiceURL,data)=>{

        const config = {
            headers: {
              Authorization: sessionStorage.getItem("authtoken"),
            },
          };
        // console.log(process.env.REACT_APP_URL)
        const response = await axios.post(ServiceURL,data,config)
        console.log(response);
        
        // alert("Error Occured From Server")
       
            return response.data
        
      
    
  
}

export default requestPost