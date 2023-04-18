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
    {children ? ( <span onClick={onOpen}>{children}</span> ):(
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
          >{user.DocName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between">
          <Image borderRadius="full"
          boxSize="100px"
          src={user.pic}
          alt={user.DocName}
          />
          <Text
          fontSize={{base:"20px",md:"30px"}}
fontFamily="work sans"
>
  Email: {user.DocEmail}
</Text>
<Text
          fontSize={{base:"20px",md:"30px"}}
fontFamily="work sans"
>
  Mob: {user.MobNum}
</Text>
<Text
          fontSize={{base:"20px",md:"30px"}}
fontFamily="work sans"
>
  Specialization: {user.Speciality}
</Text>
          </ModalBody>

          <ModalFooter>
            
            <Button colorScheme='blue' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default ProfileModal