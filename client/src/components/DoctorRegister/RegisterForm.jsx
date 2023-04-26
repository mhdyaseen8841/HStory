import React, { useState, useEffect } from "react";
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
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useFileUpload } from "use-file-upload";
const Form1 = (props) => {
  const toast = useToast();

  const [show, setShow] = React.useState(false);
  const [file, selectFiles] = useFileUpload();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      mobile === "" ||
      email === "" ||
      address === "" ||
      gender === "" ||
      city === "" ||
      state === "" ||
      zip === "" ||
      password === ""
    ) {
      toast({
        title: "Please fill all the fields! ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!file) {
      toast({
        title: "Please upload your picture! ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    let data = {
      DocName: name,
      MobNum: mobile,
      DocEmail: email,
      DocAddress: address,
      gender: gender,
      City: city,
      State: state,
      Zip: zip,
      password: password,
      pic: file.source,
    };

    props.setData(data);
    props.nextStep();
  };

  function handleGenderChange(value) {
    setGender(value);
  }

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Personal Details
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" fontWeight={"normal"}>
            Name
          </FormLabel>
          <Input
            id="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="mobile" fontWeight={"normal"}>
            Mobile no
          </FormLabel>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="mobile no"
          />
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email" pt={3} fontWeight={"normal"}>
          Gender
        </FormLabel>
        <RadioGroup id="gender" value={gender} onChange={handleGenderChange}>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="address" fontWeight={"normal"}>
            Address
          </FormLabel>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="city" fontWeight={"normal"}>
            City
          </FormLabel>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="city"
          />
        </FormControl>
      </Flex>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="state" fontWeight={"normal"}>
            State
          </FormLabel>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="zip" fontWeight={"normal"}>
            Zip Code
          </FormLabel>
          <Input
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip Code"
          />
        </FormControl>
      </Flex>
      <FormControl isRequired>
        <FormLabel>Upload Image</FormLabel>
      </FormControl>
      <Button
        onClick={() =>
          selectFiles(
            { accept: "image/*,application/pdf" },
            ({ name, size, source, file }) => {
              console.log("Files Selected", { name, size, source, file });
            }
          )
        }
        fontFamily={"heading"}
        bg={"gray.200"}
        color={"gray.800"}
      >
        Upload Image
      </Button>

      {file ? <Text fontSize="sm">File uploaded*</Text> : <></>}

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Flex>
        <Button
          onClick={() => {}}
          isDisabled={true}
          colorScheme="teal"
          variant="solid"
          w="7rem"
          mr="5%"
        >
          Back
        </Button>
        <Button
          w="7rem"
          onClick={handleSubmit}
          colorScheme="teal"
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

const Form2 = (props) => {
  const arr = ["eyes", "lungs", "ear", "heart"];

  const toast = useToast();

  const [college, setCollege] = useState("");
  const [passout, setPassout] = useState("");
  const [cHospital, setCHospital] = useState("");
  const [hAddress, setHAddress] = useState("");

  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [collegeDetails, setCollegeDetails] = useState([]);
  const [collegeCount, setCollegeCount] = useState(1);
  const handleSubmit = () => {
    if (
      !cHospital ||
      !hAddress ||
      !speciality ||
      !experience
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    var education = [];
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
    
    // let education=[
    //   {
    //     college:college,
    //     year:passout
    //   }
    // ]
    console.log(education);
    let data = {
      education: education,
      Hospital: cHospital,
      HospitalAddress: hAddress,
      Speciality: speciality,
      Experience: experience,
    };

    props.setData(data);
    props.nextStep();
  };

  const handleBack = () => {
    props.backStep();
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        professional Details
      </Heading>
      {[...Array(collegeCount)].map((result, index) => {
        return (
          <Flex gap="2">
            <FormControl w="50%">
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
                Passout Year
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
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="hospital_name"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
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
          value={cHospital}
          onChange={(e) => setCHospital(e.target.value)}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="hospital_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
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
          value={hAddress}
          onChange={(e) => setHAddress(e.target.value)}
        />
      </FormControl>

      <Flex>
        <FormControl mr="5%">
          <FormLabel
            htmlFor="state"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
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
            rounded="md"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            {arr.map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor="zip"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Total Experience
          </FormLabel>
          <Input
            id="experience"
            placeholder="Total Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </FormControl>
      </Flex>
      <Flex>
        <Button
          onClick={handleBack}
          colorScheme="teal"
          variant="solid"
          w="7rem"
          mr="5%"
        >
          Back
        </Button>
        <Button
          w="7rem"
          onClick={handleSubmit}
          colorScheme="teal"
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </>
  );
};

const Form3 = (props) => {
  const toast = useToast();
  const [iFile, selectIFiles] = useFileUpload();

  const [mFile, selectMFiles] = useFileUpload();

  const [rCouncil, setRCouncil] = useState("");
  const [rNumber, setRNumber] = useState("");
  const [rYear, setRYear] = useState("");

  const handleBack = () => {
    props.backStep();
  };

  const submitForm = () => {
    if (!iFile || !mFile || rCouncil === "" || rNumber === "" || rYear === "") {
      toast({
        title: "Please fill all the fields",

        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      console.log("esetttttt");

      let data = {
        RegistrationCouncil: rCouncil,
        RegistrationNo: rNumber,
        RegYear: rYear,
        IdentityProof: iFile.source,
        MedicalProof: mFile.source,
      };
      props.setData(data);
      props.handleSubmit();
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
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
              color: "gray.50",
            }}
            mt="2%"
          >
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
            value={rCouncil}
            onChange={(e) => setRCouncil(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="reg_no"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
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
            value={rNumber}
            onChange={(e) => setRNumber(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="reg_year"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
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
            value={rYear}
            onChange={(e) => setRYear(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Upload Valid ID Proof</FormLabel>
        </FormControl>

        {iFile ? (
          <Button
            onClick={() =>
              selectIFiles(
                { accept: "image/*,application/pdf" },
                ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                }
              )
            }
            fontFamily={"heading"}
            colorScheme="blue"
          >
            Proof Uploaded
          </Button>
        ) : (
          <Button
            onClick={() =>
              selectIFiles(
                { accept: "image/*,application/pdf" },
                ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                }
              )
            }
            fontFamily={"heading"}
            bg={"gray.200"}
            color={"gray.800"}
          >
            Upload Proof
          </Button>
        )}

        <FormControl isRequired>
          <FormLabel>Upload Valid Medical Proof</FormLabel>
        </FormControl>

        {mFile ? (
          <Button
            onClick={() =>
              selectMFiles(
                { accept: "image/*,application/pdf" },
                ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                }
              )
            }
            fontFamily={"heading"}
            colorScheme="blue"
          >
            Proof Uploaded
          </Button>
        ) : (
          <Button
            onClick={() =>
              selectMFiles(
                { accept: "image/*,application/pdf" },
                ({ name, size, source, file }) => {
                  console.log("Files Selected", { name, size, source, file });
                }
              )
            }
            fontFamily={"heading"}
            bg={"gray.200"}
            color={"gray.800"}
          >
            Upload Proof
          </Button>
        )}

        <Flex></Flex>
      </SimpleGrid>
      <Flex w="100%" justifyContent="">
        <Button
          onClick={handleBack}
          colorScheme="teal"
          variant="solid"
          w="7rem"
          mr="5%"
        >
          Back
        </Button>

        <Button w="7rem" colorScheme="red" variant="solid" onClick={submitForm}>
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const Navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [reqData, setReqData] = useState({});

  const setData = (data) => {
    setReqData({ ...reqData, ...data });
    console.log(reqData);
  };

  const handleBack = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
  };

  const handleNext = (e) => {
    if (step === 1) {
      setStep(step + 1);
      setProgress(progress + 33.33);
    } else if (step === 2) {
      setStep(step + 1);
      setProgress(progress + 33.33);
    } else {
      toast({
        title: "Account created.",
        description: "We have received your form.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlesubmit = async () => {
    console.log(reqData);
    if (!reqData) {
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      try {
        console.log(reqData);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/api/doctor", reqData, config);
        toast({
          title: "Account created.",
          description: "We have received your form.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Navigate("/");
      } catch (err) {
        console.log(err);
        toast({
          title: "Error Occured! ",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      console.log(reqData);
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1  nextStep={handleNext} setData={setData} /> : step === 2 ? <Form2 backStep={handleBack} setData={setData}  nextStep={handleNext}/> : <Form3 setData={setData} backStep={handleBack} handleSubmit={handlesubmit} />}
        {/* <Form2 backStep={handleBack} setData={setData} nextStep={handleNext} /> */}
        <ButtonGroup mt="5%" w="100%"></ButtonGroup>
      </Box>
    </>
  );
}
