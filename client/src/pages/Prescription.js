import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Box, Button, Flex, HStack, Heading, Spacer, Text, useToast,
FormControl,FormLabel,Input } from '@chakra-ui/react';
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
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

import PrescriptionDialog from '../components/prescription/prescriptionModal'



  const columns = [
    { name: 'Date', selector: row=>row.visitDate, sortable: true },
    { name: 'Case', selector: row=>row.caseReason, sortable: true },
    { name: 'advise', selector: row=>row.advice, sortable: true },
    { name: 'Doctor',  selector: row => row.doctor.DocName, sortable: true },
  ];
  
  

  const Prescription = () => {
    const Navigate = useNavigate();

    const {selectedChat, setSelectedChat, user,patient, chats, setChats} = ChatState()

    const toast = useToast()
    const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
const [open,setOpen] = useState(false)
const [token,setToken] = useState('');
const [prescription,setPrescription] = useState('')

    useEffect(() => {


    let pId = ""
    if(patient){
      pId=patient._id

    }
    
       if(pId==""){
Navigate('/')
       }else{
        console.log(pId)
      
        let token = patient.token
        setToken(token)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      
        axios.post('/api/prescription/allprescriptions',{id:pId} ,config).then((res) => {
          console.log(res.data)
           setData(res.data)
        }).catch((err) => {
          console.log(err)
        })
       }
       
      
        }, []);

    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
  
    const filteredData = data.filter((item) =>
      item.caseReason.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAdd = (pid) => {
      console.log(pid)
      setPrescription(pid)
setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }
  
    return (
      <Box>
        <Flex alignItems='center' bg='#cccccc' px={4} py={3}>
          <Heading fontSize='40px'>History</Heading>
          <Spacer />
          <Button mr={'4'} onClick={()=>Navigate('/user')} variant='solid' colorScheme='blue'>
            Home
          </Button>
         
        </Flex>
     <PrescriptionDialog open={open} close={handleClose} pid={prescription} token={token}/>

  
        <Box mt={4} p={4} mx='auto' alignItems='center' width='80%'  >
        
       
          <DataTable
           onRowClicked={(row)=>handleAdd(row._id)}
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
        </Box>


        
      </Box>
    );
  };
  
  export default Prescription;
  