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

  const logout = () => {
    clearTokens();
    setAuthenticated(false);
    history.push("/home");
  };

  return (
    <Flex h="7.5vh" w="100%" bg="blue" justifyContent="flex-end">
      <Center mr=".75rem">
        {authenticated ? (
          <Button onClick={logout}> Logout </Button>
        ) : (
          <Button onClick={moveToLogin}> Login </Button>
        )}
      </Center>
    </Flex>
  );
};

export default Navbar;
