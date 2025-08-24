import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg'


export default function Home() {
  const navigate = useNavigate();

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
          width={{base: '360px', md: '500px'}}
          marginBottom='32px'
        />

        <Box
          backgroundColor='primaryButton'
          width={{base: '120px', md: '190px'}}
          paddingY={{base: '4px', md: '0'}}
          borderRadius='8px'
          cursor='pointer'
          onClick={() => navigate('/capitulos')}
          >
          <Text
            color='primaryText'
            fontSize={{ base: '24px', md: '40px'}}
            fontWeight='Bold'
            textAlign='center'
          >
            Iniciar
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
