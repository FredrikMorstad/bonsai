import React from 'react';
import { LoginForm } from 'components/molecules/Forms/index';
import { Center } from '@chakra-ui/react';

const LoginPage: React.FC = () => {
  return (
    <Center>
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
