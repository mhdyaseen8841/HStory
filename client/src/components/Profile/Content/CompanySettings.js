import {useState} from 'react';
import { useToast } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Flex,
  InputGroup,
  Box,
  Button,
  IconButton
} from '@chakra-ui/react'

function CompanySettings({data,updateSubmit}) {
  const toast = useToast()
  const [collegeCount, setCollegeCount] = useState(0);
  const clickHandle =()=>{
    for (var index = 0; index < collegeCount; index++) {
      let clgNme = document.getElementById(`college_name${index}`);
      let passYear = document.getElementById(`passout_year${index}`);
      let course = document.getElementById(`course${index}`);
      if (course.value != "" && clgNme.value == "") {
        toast({
          title: "Please fill College Name",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }
      if (course.value != "" && passYear.value == "") {
        toast({
          title: "Please fill year of passout",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

        return;
      }
      if (clgNme.value != "" && passYear.value != "") {
        education.push({
          college: clgNme.value,
          degree: course.value,
          year: passYear.value,
        });
      }
    }
    if (education.length == 0) {
      toast({
        title: "Please fill Education",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    let education = data.Education
    let dat = {
      id: data._id,
      
    }
    updateSubmit(dat)
  }

  return (
    <>
      {data && data.Education.map((result, index) => {
        return (
          <Flex gap="2">
            <FormControl w="60%">
              <FormLabel
                htmlFor="course"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Course
              </FormLabel>
              <Input
                disabled
                type="text"
                name="course"
                id={`course${index}`}
                autoComplete="course"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                defaultValue={result ? result.degree : ''}
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="college_name"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                College Name
              </FormLabel>
              <Input
                disabled
                type="text"
                name="college_name"
                id={`college_name${index}`}
                autoComplete="college_name"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                defaultValue={result ? result.college : ''}
              />
            </FormControl>
            
            <FormControl w="30%">
              <FormLabel
                htmlFor="passout_year"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Passout
              </FormLabel>
              <Input
                disabled
                type="text"
                name="passout_year"
                id={`passout_year${index}`}
                autoComplete="passout_year"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                defaultValue={result ? result.year : ''}
              />
            </FormControl>
          </Flex>
          
        );
      })}




{[...Array(collegeCount)].map((result, index) => {
        return (
          <Flex gap="2">
            <FormControl w="60%">
              <FormLabel
                htmlFor="course"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Course
              </FormLabel>
              <Input
                type="text"
                name="course"
                id={`course${index}`}
                autoComplete="course"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="college_name"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                College Name
              </FormLabel>
              <Input
                type="text"
                name="college_name"
                id={`college_name${index}`}
                autoComplete="college_name"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>
            
            <FormControl w="30%">
              <FormLabel
                htmlFor="passout_year"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Passout
              </FormLabel>
              <Input
                type="text"
                name="passout_year"
                id={`passout_year${index}`}
                autoComplete="passout_year"
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>
          </Flex>
        );
      })}
      <Flex>
        <IconButton
          icon={<AddIcon />}
          onClick={() => {
            setCollegeCount(collegeCount + 1);
          }}
        />{" "}
      </Flex>


      
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
          <Button  onClick={clickHandle}>Update</Button>
        </Box>
    </>
  )
}

export default CompanySettings
