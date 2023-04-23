

import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Box, Button, Flex, HStack, Heading, Spacer, Text, useToast,
FormControl,FormLabel,Input } from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {Spinner} from "@chakra-ui/spinner"
import PrescriptionDialog from '../components/prescription/prescriptionModal'



  const columns = [
    { name: 'Date', selector: 'visitDate', sortable: true },
    { name: 'Case', selector: 'caseReason', sortable: true },
    { name: 'advise', selector: 'advice', sortable: true },
    { name: 'Doctor', selector: 'doctor.DocName', sortable: true },
  ];
  
  function AddModal(props) {
    const toast = useToast()
const [advice,setAdvice] = useState('')
const [caseReason,setCaseReason] = useState('')
let err= false;
    const handleClose = () => {
      props.close()
    } 

    const handleSubmit = () => {
      err=false;

      let medicine=[];
if(!advice || !caseReason){
  toast({
    title: "Enter all fields! ",
    status: "error",
    duration: 5000,
    isClosable: true,
  })
   err =true;
    return
}

for(let i=0;i<row;i++){
  let name = document.getElementById(`name${i}`).value
  let rules = document.getElementById(`rules${i}`).value
  let days = document.getElementById(`days${i}`).value
  if(!name || !rules || !days){
    err=true;
    toast({
      title: "Enter all fields! ",
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  }
  console.log(name,rules,days)
  medicine.push({name,rules,days})
}

if(err){
  return
}




console.log("arraya dateas is")
console.log(medicine)
//get today date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
//make date string
today = dd + '/' + mm + '/' + yyyy;



      let pId = localStorage.getItem("patientId")
      let doctor=JSON.parse(localStorage.getItem("DoctorInfo"))

 const config = {
    headers: {
      Authorization: `Bearer ${doctor.token}`,
    },
  }

let Reqdata ={
  "visitDate":today,
  "advice":advice,
   "medicine":medicine,
   "patient":pId,
   "doctor":doctor._id,
   "caseReason":caseReason
  
}

axios.post('/api/prescription/addprescription',Reqdata,config).then((res)=>{
  console.log(res.data)
  toast({
    title: "Prescription Added! ",
    status: "success",
    duration: 5000,
    isClosable: true,
  })
  props.close()
}).catch((err)=>{
  console.log(err)
  toast({
    title: "Error! ",
    status: "error",
    duration: 5000,
    isClosable: true,
  })
})


console.log(Reqdata)

    }

    const [row, setRow] = useState(1)
    return (
      <>
       
  
        <Modal isOpen={props.open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Prescription</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl>
              <FormLabel>Case</FormLabel>
              <Input value={caseReason} onChange={(e)=>setCaseReason(e.target.value)} placeholder='Case Reason' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Advise</FormLabel>
              <Input value={advice} onChange={(e)=>setAdvice(e.target.value)} placeholder='Advise' />
            </FormControl>

            <FormControl>
              <FormLabel>Medicines</FormLabel>
              
            </FormControl>
{[...Array(row)].map((e, i) => (
    <HStack spacing='24px' mt={2}>
    <Input id={`name${i}`}  placeholder='name' />
      <Input id={`rules${i}`} placeholder='rules' />
      <Input id={`days${i}`} placeholder='days'/>
    
      </HStack>


))}

          
         
<Button colorScheme='blue' mr={3} mt={2} onClick={()=>setRow(row+1)}>
                Add One
              </Button>
        
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button>
              <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  const DoctorPrescription = () => {
    const toast = useToast()
    const Navigate = useNavigate()
    const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
const [open,setOpen] = useState(false)
const [pOpen,setPOpen] = useState(false)
const [prescription,setPrescription] = useState('')
const [token,setToken] = useState('');
const [loading, setLoading] = useState(true);
    useEffect(() => {
    
       let pId = localStorage.getItem("patientId")
     console.log(pId)
      
          let doctor=JSON.parse(localStorage.getItem("DoctorInfo"))
          let token = doctor.token
          setToken(token)
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        
          axios.post('/api/prescription/allprescriptions',{id:pId} ,config).then((res) => {
            setLoading(false);
            console.log(res.data)
             setData(res.data)
          }).catch((err) => {
            console.log(err)
            toast({
              title: 'Error fetching prescriptions',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            setLoading(false);
          })
      
        }, [open]);

    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
  
    const filteredData = data.filter((item) =>
      item.caseReason.toLowerCase().includes(searchText.toLowerCase())
    );
    

    const handleAdd = () => {
setOpen(true)
    }

    const handlePAdd = (pid) => {
      console.log(pid)
      setPrescription(pid)
      setPOpen(true)
    }

    const handlePClose = () => {
      setPOpen(false)
    }
  

    const handleClose = () => {
      setOpen(false)
    }
  
    return (
      <Box>
        <Flex alignItems='center' bg='#cccccc' px={4} py={3}>
          <Heading fontSize='40px'>History</Heading>
          <Spacer />

          <Button mr={'4'} onClick={()=>Navigate('/doctor')} variant='solid' colorScheme='blue'>
            Home
          </Button>
         
          <Button onClick={()=>Navigate('/chat')} variant='solid' colorScheme='blue'>
            Chat
          </Button>
        </Flex>
     
<AddModal open={open} close={handleClose}/>
<PrescriptionDialog open={pOpen} close={handlePClose} pid={prescription} token={token}/>

  
        <Box mt={4} p={4} mx='auto' alignItems='center' width='80%'  >
        
        <HStack justify="flex-end" mb={2}>
        <Button variant="solid" colorScheme="blue"  onClick={()=>Navigate('/doctor/currentmedicines')}>
    View Current Medicines
  </Button>
  <Button variant="solid" colorScheme="blue"  onClick={handleAdd}>
    Add
  </Button>
</HStack>
{loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
      ) : (
          <DataTable
            onRowClicked={(row)=>handlePAdd(row._id)}
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped

            subHeader
            subHeaderComponent={
              <input
                type='text'
                placeholder='Search by name'
                value={searchText}
                onChange={handleSearch}
                style={{ marginBottom: 10 }}
              />
            }
          />
      )}
        </Box>


        
      </Box>
    );
  };
  
  export default DoctorPrescription;
  