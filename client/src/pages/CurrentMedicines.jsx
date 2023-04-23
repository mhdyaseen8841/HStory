import React,{useEffect,useState} from "react";
import { Box, Flex, Heading, Text,Spacer,Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from '../Context/ChatProvider'
import axios from 'axios'
import PrescriptionDialog from '../components/prescription/prescriptionModal'
const CurrentMedicines = () => {
    const Navigate = useNavigate();
    const { patient} = ChatState()
const [data, setData] = useState([])
   
const [open,setOpen] = useState(false)
const [token,setToken] = useState('');
const [prescription,setPrescription] = useState('')

   const handleAdd = (pid) => {
      console.log(pid)
      setPrescription(pid)
setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }
  

        useEffect(() => {
    
   
            const patient = JSON.parse(localStorage.getItem('patientInfo'))
            
            console.log(patient)
            console.log("hehehehe")
            let id = patient._id
            if(!patient){
        Navigate('/')
            }else{
                  let token = patient.token
        setToken(token)
                const config = {
                    headers: {
                      Authorization: `Bearer ${patient.token}`,
                    },
                  }
                
                  axios.post('/api/prescription/getcurrentmedicines',{patient:id} ,config).then((res) => {
                    console.log(res.data)
                     setData(res.data)
                  }).catch((err) => {
                    console.log(err)
                  })
            }
          }, [patient])




  return (
    <Box><Flex alignItems='center' bg='#cccccc' px={4} py={3}>
    <Heading fontSize='40px'>History</Heading>
    <Spacer />
    <Button mr={'4'} onClick={()=>Navigate('/user')} variant='solid' colorScheme='blue'>
      Home
    </Button>
   
  </Flex>
  <PrescriptionDialog open={open} close={handleClose} pid={prescription} token={token}/>
    <Box maxW="900px" mx="auto" >
      <Heading as="h2" mb="4" textAlign="center">
        Current Medicines
      </Heading>
      {data.length ? (
        <Flex justifyContent="space-between" flexWrap="wrap">
         {data.map((medicine, index) => (
            <Box
              key={index}
              width={["100%", "100%", "48%"]}
              p="4"
              bg="white"
              borderRadius="lg"
              boxShadow="base"
              mb="4"
              pr="4"
              position="relative"
            >
              <Box width="50%" float="left">
                <Heading as="h3" size="md" mb="2">
                  {medicine.med.name}
                </Heading>
                <Text mb="2">{medicine.med.rules}</Text>
                <Text>Total Days: {medicine.med.days}</Text>
                <Text color={'red'}>Remaining Days: {medicine.pendingDays}</Text>
              </Box>
              <Box
          width="50%"
          float="right"
          textAlign="right"
          position="absolute"
          right="4"
        >
          <Text pt="6" mb="2"  >Visit Date: {medicine.Vdate}</Text>
          <Button mt="4" mb="2" onClick={()=>handleAdd(medicine.pId)}>Show More</Button>
          
         
        </Box>
            </Box>
          ))}
        </Flex>
      ) : (
        <Text textAlign="center">No current medicines.</Text>
      )}
    </Box>
    </Box>
  );
};

export default CurrentMedicines;
