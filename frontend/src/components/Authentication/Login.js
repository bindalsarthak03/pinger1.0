import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitHandler = () => {};

  return (
    <VStack spacing="5px" color="black">
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

      <Button
        colorScheme="cyan"
        variant={"outline"}
        color={"black"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        colorScheme="yellow"
        variant="outline"
        color={"black"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail('guest@example.com');
          setPassword('123456@')
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
