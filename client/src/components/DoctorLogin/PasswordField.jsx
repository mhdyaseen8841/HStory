import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
  } from '@chakra-ui/react'
  import { forwardRef, useRef } from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  
  export const PasswordField = forwardRef((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({
          preventScroll: true,
        })
      }
    }
    return (
     <></>
    )
  })
  PasswordField.displayName = 'PasswordField'