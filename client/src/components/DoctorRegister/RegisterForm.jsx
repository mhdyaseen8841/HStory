import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Radio, RadioGroup,Stack,Text
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import { useFileUpload } from "use-file-upload";
const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const [file, selectFiles] = useFileUpload()

  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
      Personal Details
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" fontWeight={'normal'}>
            name
          </FormLabel>
          <Input id="name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="mobile" fontWeight={'normal'}>
          Mobile no
          </FormLabel>
          <Input id="mobile" placeholder="mobile no" />
        </FormControl>
      </Flex>
    

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      
      <FormControl >
      <FormLabel htmlFor="email" pt={3} fontWeight={'normal'}>
         Gender
        </FormLabel>
      <RadioGroup>
      <Stack direction='row'>
        <Radio value='1'>Male</Radio>
        <Radio value='2'>Female</Radio>
        <Radio value='3'>Other</Radio>
      </Stack>
    </RadioGroup>
    </FormControl>

    <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="address" fontWeight={'normal'}>
            Address
          </FormLabel>
          <Input id="address" placeholder="Address" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="city" fontWeight={'normal'}>
          City
          </FormLabel>
          <Input id="city" placeholder="city" />
        </FormControl>
      </Flex>
      
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="state" fontWeight={'normal'}>
            State
          </FormLabel>
          <Input id="state" placeholder="State" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="zip" fontWeight={'normal'}>
          Zip Code
          </FormLabel>
          <Input id="zip" placeholder="Zip Code" />
        </FormControl>
      </Flex>
      <FormControl  isRequired>
                    <FormLabel>Upload Valid ID Proof</FormLabel>
                    </FormControl>
                    <Button onClick={() =>
          selectFiles({ accept: "image/*,application/pdf" }, ({ name, size, source, file }) => {
            console.log("Files Selected", { name, size, source, file });
          })
        } fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} >
                Upload Proof
              </Button>
             
             {file?
             <Text fontSize='sm'>File uploaded*</Text>
                 
             :
             < ></>
                 
             
            }
      
      <FormControl>
        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
     
    </>
  );
};

const Form2 = () => {
  const arr=["eyes","lungs","ear","heart"]
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
      professional Details
      </Heading>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="college_name"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          College Name
        </FormLabel>
        <Input
          type="text"
          name="college_name"
          id="college_name"
          autoComplete="college_name"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="passout_year"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Passout Year
        </FormLabel>
        <Input
          type="text"
          name="passout_year"
          id="passout_year"
          autoComplete="passout_year"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="hospital_name"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Current Hospital
        </FormLabel>
        <Input
          type="text"
          name="hospital_name"
          id="hospital_name"
          autoComplete="hospital_name"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="hospital_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Hospital Address
        </FormLabel>
        <Input
          type="text"
          name="hospital_address"
          id="hospital_address"
          autoComplete="hospital_address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="state" fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
            Speciality
          </FormLabel>
          <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md">
            {arr.map((value, index) => {
    return <option key={index} value={value}>{value}</option>
  })}
         
        </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="zip"  fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
         Total Experience
          </FormLabel>
          <Input id="experience" placeholder="Total Experience" />
        </FormControl>
      </Flex>

     
    </>
  );
};

const Form3 = () => {
  const [iFile, selectIFiles] = useFileUpload()

  const [mFile, selectMFiles] = useFileUpload()

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
      professional Details
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
           
         <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="college_name"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Registration Council
        </FormLabel>
        <Input
          type="text"
          name="college_name"
          id="college_name"
          autoComplete="college_name"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="reg_no"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Registration Number
        </FormLabel>
        <Input
          type="text"
          name="reg_no"
          id="reg_no"
          autoComplete="reg_no"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="reg_year"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
         Registration Year
        </FormLabel>
        <Input
          type="text"
          name="reg_year"
          id="reg_year"
          autoComplete="reg_year"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl  isRequired>
                    <FormLabel>Upload Valid ID Proof</FormLabel>
                    </FormControl>
                    <Button onClick={() =>
          selectIFiles({ accept: "image/*,application/pdf" }, ({ name, size, source, file }) => {
            console.log("Files Selected", { name, size, source, file });
          })
        } fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} >
                Upload Proof
              </Button>
             
             {iFile?
             <Text fontSize='sm'>File uploaded*</Text>
                 
             :
             < ></>
                 
             
            }

<FormControl  isRequired>
                    <FormLabel>Upload Valid Medical Proof</FormLabel>
                    </FormControl>
                    <Button onClick={() =>
          selectMFiles({ accept: "image/*,application/pdf" }, ({ name, size, source, file }) => {
            console.log("Files Selected", { name, size, source, file });
          })
        } fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} >
                Upload Proof
              </Button>
             
             {mFile?
             <Text fontSize='sm'>File uploaded*</Text>
                 
             :
             < ></>
                 
             
            }
      </SimpleGrid>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}