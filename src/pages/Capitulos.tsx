import { Box, Flex, Image, Text } from "@chakra-ui/react";
import LogoHeader from "../assets/LogoHeader.svg";

export default function Capitulos() {
    return (
        <Flex
            height='100dvh'
            flexDirection='column'
        >
            <Flex
                justifyContent='center'
            >
                <Image
                    src={LogoHeader}
                    width={{ base: '115px', md: '242px' }}
                    marginTop={{ base: '32px', md: '48px' }}
                    marginBottom={{ base: '12px', md: '16px' }}
                />
            </Flex>
            <Flex
                flexDirection='column'
                alignItems='center'
                flex={1}
            >
                <Text
                    color='primaryButton'
                    fontSize={{ base: '20px', md: '36px' }}
                    marginBottom={{ base: '32px', md: '48px' }}
                >
                    Selecione o Nível
                </Text>

                <Box
                    width={{ base: '360px', md: '430px'}}
                    height={{ base: '470px', md: '80%'}}
                    borderWidth='4px'
                    borderColor='primaryButton'
                    borderRadius='4px'
                >

                </Box>
            </Flex>
        </Flex>
    )
}