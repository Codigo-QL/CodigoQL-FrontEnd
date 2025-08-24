import { Box, Flex, Image, Text } from "@chakra-ui/react";
import LogoHeader from "../assets/LogoHeader.svg";
import ReactMarkdown from 'react-markdown';

const markdownComponents = {
    p: (props: any) => <Text fontSize={{ base: '12px', md: '16px' }} mb={2}>{props.children}</Text>,
    strong: (props: any) => <Text as="b">{props.children}</Text>,
    ul: (props: any) => (
        <Box as="ul" pl={5} style={{ listStyleType: 'disc' }} fontSize={{ base: '12px', md: '16px' }}>
            {props.children}
        </Box>
    ),
    li: (props: any) => (
        <Box as="li" mb={1}>
            {props.children}
        </Box>
    ),
};

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
                minH={0}
            >
                <Text
                    color='primaryButton'
                    fontSize={{ base: '20px', md: '36px' }}
                    marginBottom={{ base: '32px', md: '48px' }}
                >
                    Selecione o Nível
                </Text>

                <Flex
                    width="100%"
                    maxW={{ base: '380px', md: '950px' }}
                    flex={1}
                    overflowY="auto"
                    minH={0}
                    flexWrap="wrap"
                    justifyContent="center"
                    gap="16px"
                    p={2}
                >
                    <Flex
                        flexDirection='column'
                        width={{ base: '100%', md: 'calc(50% - 8px)' }}
                        height={{ base: '470px', md: '95%' }}
                        borderWidth='4px'
                        borderColor='primaryButton'
                        borderRadius='4px'
                    >
                        <Flex
                            flexDirection='column'
                            height='fit-content'
                            paddingX='8px'
                            paddingTop='4px'
                            paddingBottom='16px'
                            borderBottomWidth='4px'
                            borderColor='primaryButton'
                        >
                            <Text
                                fontSize={{ base: '16px', md: '24px' }}
                                fontWeight='bold'
                                marginBottom={{ base: '4px', md: '8px' }}
                            >
                                Capítulo C1 - Boas Vindas à UCC
                            </Text>

                            <ReactMarkdown components={markdownComponents}>
                                {"Seu primeiro dia como estagiário na UCC parecia ser chato como qualquer outro, entregas de café e organização de arquivos. Até que você ouve um chamado inesperado da rádio de sua supervisora, um chamado que irá mudar a sua vida.\n\n**Conteúdos abordados neste capítulo:**\n\n- Consultas em uma única tabela\n- Consultas envolvendo mais de uma tabela\n- Consultas com funções de agregação\n- Consultas com agrupamento e ordenação"}
                            </ReactMarkdown>
                        </Flex>

                        <Flex
                            flex={1}
                            minH={0}
                            overflowY="auto"
                            marginY='16px'
                            justifyContent='center'
                        >
                            <Flex
                                flexWrap="wrap"
                                gap="16px"
                                justifyContent="center"
                                alignItems='center'

                            >
                                <Flex
                                    width={{base: '100px', md: '120px'}}
                                    height={{base: '100px', md: '120px'}}
                                    backgroundColor='primaryButton'
                                />


                            </Flex>
                        </Flex>
                    </Flex>


                </Flex>
            </Flex>
        </Flex>
    )
}