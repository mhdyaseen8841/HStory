import { useState, useRef } from 'react'
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useFileUpload } from "use-file-upload";

function Prof({details,callback}) {
  const [userProfile, setUserProfile] = useState(null)
  const [file, selectFiles] = useFileUpload();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const profileImage = useRef(null)
console.log(details)
const Doc= JSON.parse(localStorage.getItem("DoctorInfo"))
  const openChooseImage = () => {
    profileImage.current.click()
  }

  const changeProfileImage = event => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]
    console.log(selected)
  
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => {
        console.log("heyyheyhye")
        setUserProfile(reader.result)
        selectFiles(
            { accept: "image/*" },
            ({ name, size, source, file }) => {
              console.log("Files Selected", { name, size, source, file });
            }
          )
      }
      reader.readAsDataURL(selected)
    } else {
      onOpen()
    }
  }
  
const handleUpd=()=>{
console.log(file)
  let dat = {
    id: Doc._id,
    pic: file.source,
  }
  callback(dat)
}

  return (
    <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
      <Avatar
        size="2xl"
        name={Doc.DocName}
        cursor="pointer"
        onClick={openChooseImage}
        src={userProfile? userProfile: Doc.pic? Doc.pic: "https://png.pngtree.com/png-clipart/20220911/original/pngtree-male-doctor-avatar-icon-illustration-png-image_8537702.png"}
        // src= {Doc.pic}

      >
    
      </Avatar>
      <input
        hidden
        type="file"
        ref={profileImage}
        onChange={changeProfileImage}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Something went wrong</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>File not supported!</Text>
            <HStack mt={1}>
              <Text color="brand.cadet" fontSize="sm">
                Supported types:
              </Text>
              <Badge colorScheme="green">PNG</Badge>
              <Badge colorScheme="green">JPG</Badge>
              <Badge colorScheme="green">JPEG</Badge>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={1}>
        <Heading as="h3" fontSize="xl" color="brand.dark">
         {Doc.DocName}
     
        </Heading>
        <Text color="brand.gray" fontSize="sm">
        {Doc.Speciality}

        </Text>
       {userProfile?(
        <Button onClick={handleUpd}>Update</Button>
       ):""} 
      </VStack>
    </VStack>
  )
}

export default Prof