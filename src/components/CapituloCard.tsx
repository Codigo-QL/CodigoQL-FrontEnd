import { Box, Flex, Text } from "@chakra-ui/react"
import ReactMarkdown from 'react-markdown';
import { NivelCard } from "./NivelCard";

interface CapituloCardProps {
    codigo: string;
    titulo: string;
    descricao: string;
}

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

export const CapituloCard = ({ codigo, titulo, descricao } : CapituloCardProps) => {

    return (
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
                    Capítulo {codigo} - {titulo}
                </Text>

                <ReactMarkdown components={markdownComponents}>
                    {descricao}
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
                    <NivelCard
                        image=""
                        nivelId={1}
                    />

                </Flex>
            </Flex>
        </Flex>
    )
}