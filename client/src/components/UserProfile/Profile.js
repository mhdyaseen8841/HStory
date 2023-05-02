import { Container } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sideber";
import Cover from "./Cover";
import "./styles/index.css";

export default function Profile() {
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const Navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const patient = JSON.parse(localStorage.getItem('patientInfo'))
            
            console.log(patient)
            console.log("hehehehe")
            let id = patient._id
            if(!patient){
      Navigate("/");
    } else {
      setToken(patient.token);
      const config = {
        headers: {
          Authorization: `Bearer ${patient.token}`,
        },
      };

      axios
        .post("/api/user/getUser", { id: id }, config)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const updateSubmit = (data) => {
    console.log(data);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put("/api/user/getUser", data, config)
      .then((res) => {
        console.log(res.data);
        //setData(res.data)
        toast({
          title: "updated successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Cover />
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
       
        <Content details={data} callback={updateSubmit} />
      </Container>
    </>
  );
}
