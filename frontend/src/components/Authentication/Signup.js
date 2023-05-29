import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();

  const toast = useToast();
  const history = useHistory();
  const postPic = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      return (
        <Button
          onClick={() =>
            toast({
              title: "Please select an Image!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
          }
        ></Button>
      );
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "pinger");
      data.append("cloud_name", "dnowsn1o5");
      fetch("https://api.cloudinary.com/v1_1/dnowsn1o5/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      return (
        <Button
          onClick={() =>
            toast({
              title: "Please select an Image!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
          }
        ></Button>
      );
    }
  };

  const submitHandler = () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setLoading(false);
      return (
        <Button
          onClick={() =>
            toast({
              title: "Please fill all feilds!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
          }
        ></Button>
      );
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return (
        <Button
          onClick={() =>
            toast({
              title: "Password do not match!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            })
          }
        ></Button>
      );
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration Successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); 
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      history.push('/chats')
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      }); 
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email id"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="pasword"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postPic(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="cyan"
        color={"black"}
        variant={"outline"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
