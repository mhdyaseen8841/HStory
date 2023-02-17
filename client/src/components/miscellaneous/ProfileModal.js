import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
function ProfileModal({user, children}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <div>{children}</div>
    </>
  )
}

export default ProfileModal