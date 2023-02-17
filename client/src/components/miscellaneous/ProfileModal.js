import React from 'react'
import { useDisclosure,Image,Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
function ProfileModal({user, children}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {children ? ( <span onCLick={onOpen}>{children}</span> ):(
 <IconButton d={{ base : "flex"}}
 icon={<ViewIcon/>}
onClick={onOpen}
 />
    )}

<Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
          fontSize="40px"
          fontFamily="work sans"
          display="flex"
          justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
          <Image borderRadius="full"
          boxSize="150px"
          src={user.pic}
          alt={user.name}
          />
          <Text
          fontSize={{base:"20px",md:"30px"}}
fontFamily="work sans"
>
  Email: {user.email}
</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default ProfileModal