

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Box, Button, Flex, HStack, Heading, Spacer, Text } from '@chakra-ui/react';





const data = [
    { name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 555-1212', date: '2022-04-08' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 555-2323', date: '2022-04-09' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1 (555) 555-3434', date: '2022-04-10' },
    { name: 'Alice Brown', email: 'alice.brown@example.com', phone: '+1 (555) 555-4545', date: '2022-04-11' },
  ];

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'Phone Number', selector: 'phone', sortable: true },
    { name: 'Date', selector: 'date', sortable: true },
  ];
  


  const Prescription = () => {
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
  
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
    return (
      <Box>
        <Flex alignItems='center' bg='#cccccc' px={4} py={3}>
          <Heading fontSize='40px'>History</Heading>
          <Spacer />
          <Button mr={'4'} variant='solid' colorScheme='blue'>
            Prescription
          </Button>
          <Button variant='solid' colorScheme='blue'>
            Chat
          </Button>
        </Flex>
     


  
        <Box mt={4} p={4} mx='auto' alignItems='center' width='80%'  >
        
        <HStack justify="flex-end">
  <Button variant="solid" colorScheme="blue" mb={2}>
    Add
  </Button>
</HStack>
          <DataTable
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
  