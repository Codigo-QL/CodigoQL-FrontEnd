import { useState } from 'react';
import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/Logo.svg';
import GoogleLogo from '../assets/Google.png';
import { TCLE } from '../components/TCLEDialog';
import { AvisoProgressoLocalDialog } from '../components/AvisoProgressoLocalDialog';


export default function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle, logout, loading } = useAuth();
  const [TCLEOpen, setTCLEOpen] = useState(false);
  const [avisoOpen, setAvisoOpen] = useState(false);

  const handleLogin = async () => {
    setTCLEOpen(false);
    await signInWithGoogle();
    navigate('/capitulos');
  }

  const handleWarning = () => {
    setAvisoOpen(false);
    setTCLEOpen(true);
  }

  const handleInit = () => {
    navigate('/capitulos')
  }

  const verifyUser = () => {
    if (user) {
      handleInit();
    } else {
      setAvisoOpen(true)
    }
  }

  return (
    <Box
      height='100%'
    >
      <Flex
        height='100%'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Image
          src={Logo}
          width={{ base: '360px', md: '500px' }}
          marginBottom='32px'
        />

        <Button
          backgroundColor='primaryButton'
          width='140px'
          paddingY='4px'
          borderRadius='100px'
          cursor='pointer'
          onClick={verifyUser}
          marginBottom='8px'
        >
          <Text
            color='primaryText'
            fontSize='24px'
            fontWeight='Bold'
            textAlign='center'
          >
            Entrar
          </Text>
        </Button>

        {
          loading ?
            <Spinner /> :
            <>
              {
                user ?
                  <Flex
                    flexDirection='column'
                  >
                    <Text>
                      Login feito com email: {user.email}
                    </Text>
                    <Text
                      color='teal'
                      textDecoration='underline'
                      cursor='pointer'
                      onClick={logout}
                    >
                      Sair da conta
                    </Text>
                  </Flex>
                  :
                  <Button
                    backgroundColor='primaryButton'
                    width='260px'
                    paddingY='4px'
                    borderRadius='100px'
                    cursor='pointer'
                    onClick={() => setTCLEOpen(true)}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Image
                      width='35px'
                      src={GoogleLogo}
                      marginRight='4px'
                    />
                    <Text
                      color='primaryText'
                      fontSize='24px'
                      fontWeight='Bold'
                      textAlign='center'
                    >
                      Entrar com Google
                    </Text>
                  </Button>
              }
            </>
        }

      </Flex>
      <TCLE 
        isOpen={TCLEOpen}
        onClick={handleLogin}
      />
      <AvisoProgressoLocalDialog 
        isOpen={avisoOpen}
        onClose={handleWarning}
        onConfirm={handleInit}
      />
    </Box>
  )
}
