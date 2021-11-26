import React, { useState, useContext } from "react";
import { login } from "api/auth";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { AuthenticateContext } from "context/authProvider";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, settPassword] = useState<string | undefined>();
  const [errorMsg, setError] = useState<string | undefined>();
  const history = useHistory();
  const { setAuthenticated } = useContext(AuthenticateContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === undefined || password === undefined) {
      setError("Both email and password must be added");
      return;
    }

    try {
      await login(email, password);
      setAuthenticated(true);
      history.push("/");
    } catch (error) {
      // TODO regex email validating
      console.log(error.statusCode);
      if (error.statusCode === 401) {
        setError("Invalid email or password");
        return;
      } else {
        setError("Unexpected error");
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settPassword(e.target.value);
  };

  return (
    <Flex width="100%" align="center" justifyContent="center">
      <Box>
        <Center>
          <Heading as="h5" size="md">
            Login
          </Heading>
        </Center>
        <Box>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                onChange={handlePasswordChange}
              />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
        {errorMsg && <p>{errorMsg}</p>}
      </Box>
    </Flex>
  );
};

export default LoginForm;
