import React, { useContext } from "react";
import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { AuthenticateContext } from "context/authProvider";
import { clearTokens } from "api/token";

// just a temporary navbar containing login button
const Navbar = () => {
  const { authenticated, setAuthenticated } = useContext(AuthenticateContext);
  const history = useHistory();

  const moveToLogin = () => history.push("/login");
  const moveToRegister = () => history.push("/register");

  const logout = () => {
    clearTokens();
    setAuthenticated(false);
    history.push("/home");
  };

  return (
    <Flex h="7.5vh" w="100%" bg="darkgreen" justifyContent="flex-end">
      <Center mr=".75rem">
        {authenticated ? (
          <Button onClick={logout}> Logout </Button>
        ) : (
          <Button onClick={moveToLogin}> Login </Button>
        )}
      </Center>
      <Center mr=".75rem">
        {authenticated ? (
          <div></div>
        ) : (
          <Button onClick={moveToRegister}> Register </Button>
        )}
      </Center>
    </Flex>
  );
};

export default Navbar;
