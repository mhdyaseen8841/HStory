import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Text,
  Table,
  Box,
  Heading,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import axios from 'axios'

import React, { useEffect, useState } from 'react'

function PrescriptionDialog(props) {
  const Toast = useToast()
  const pId = props.pid

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({})
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    if (props.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }

      axios
        .post('http://localhost:5000/api/prescription/getprescriptionbyid', { pId: pId }, config)
        .then((res) => {
          setData(res.data)
          setIsData(true)
        })
        .catch((err) => {
          Toast({
            title: 'Error! ',
            description: err.response.data.msg,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })

          props.close()
        })
    }
  }, [props.open])

  const onClose = () => {
    props.close()
  }

  return (
    <>
      <Modal isOpen={props.open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isData ? (
              <>
                <Box mb={4}>
                  <Heading size="md">Patient Information</Heading>
                  <Text fontSize="md">
                    <strong>Visit Date:</strong> {data.visitDate}
                  </Text>
                  <Text fontSize="md">
                    <strong>Case:</strong> {data.caseReason}
                  </Text>
                </Box>
                <Box mb={4}>
                  <Heading size="md">Prescription Details</Heading>
                  <Text fontSize="md">
                    <strong>Doctor:</strong> {data.doctor.DocName}
                  </Text>
                  <Text fontSize="md">
                    <strong>Hospital:</strong> {data.doctor.Hospital}
                  </Text>
                  <Text fontSize="md">
                    <strong>Advice:</strong> {data.advice}
                  </Text>
                </Box>
                <Box>
                  <Heading size="md">Medicines</Heading>
                  <Table variant="striped" colorScheme="gray">
                    <thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Rules</Th>
                        <Th>Days</Th>
                      </Tr>
                    </thead>
                    <tbody>
                      {data.medicine &&
                        data.medicine.map((item, index) => (
                          <Tr
                            key={index}
                            _hover={{
                              background: 'gray.100',
                            }}
                          >
                            <Td>{item.name}</Td>
                            <Td>{item.rules}</Td>
                            <Td>{item.days}</Td>
                          </Tr>
                        ))}
                    </tbody>
                  </Table>
                </Box>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </>
  )
}

export default PrescriptionDialog
