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
    let doctor = JSON.parse(localStorage.getItem("DoctorInfo"));

    let id = doctor._id;
    if (!doctor) {
      Navigate("/");
    } else {
      setToken(doctor.token);
      const config = {
        headers: {
          Authorization: `Bearer ${doctor.token}`,
        },
      };

      axios
        .post("/api/doctor/getDoctorById", { id: id }, config)
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
      .put("/api/doctor/getDoctorById", data, config)
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
        <Sidebar />
        <Content details={data} callback={updateSubmit} />
      </Container>
    </>
  );
}
