import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/Logo.svg';
import GoogleLogo from '../assets/Google.png';


export default function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle, logout, loading } = useAuth();

  const handleLogin = async () => {
    await signInWithGoogle();
    navigate('/capitulos');
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

        <Box
          backgroundColor='primaryButton'
          width='140px'
          paddingY='4px'
          borderRadius='100px'
          cursor='pointer'
          onClick={() => navigate('/capitulos')}
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
        </Box>

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
                  <Flex
                    backgroundColor='primaryButton'
                    width='260px'
                    paddingY='4px'
                    borderRadius='100px'
                    cursor='pointer'
                    onClick={handleLogin}
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
                  </Flex>
              }
            </>
        }

      </Flex>
    </Box>
  )
}
