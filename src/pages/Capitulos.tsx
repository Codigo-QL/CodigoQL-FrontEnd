import { Flex, Image, Text } from "@chakra-ui/react";
import LogoHeader from "../assets/LogoHeader.svg";
import { CapituloCard } from "../components/CapituloCard";

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

                    <CapituloCard
                        codigo="C1"
                        titulo="Boas Vindas à UCC"
                        descricao={"Seu primeiro dia como estagiário na UCC parecia ser chato como qualquer outro, entregas de café e organização de arquivos. Até que você ouve um chamado inesperado da rádio de sua supervisora, um chamado que irá mudar a sua vida.\n\n**Conteúdos abordados neste capítulo:**\n\n- Consultas em uma única tabela\n- Consultas envolvendo mais de uma tabela\n- Consultas com funções de agregação\n- Consultas com agrupamento e ordenação"}
                    />

                </Flex>
            </Flex>
        </Flex>
    )
}