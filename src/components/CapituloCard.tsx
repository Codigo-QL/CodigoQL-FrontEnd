import { Box, Flex, Text } from "@chakra-ui/react"
import ReactMarkdown from 'react-markdown';
import { NivelCard } from "./NivelCard";
import type { Capitulo } from "../pages/Capitulos";

interface CapituloCardProps {
    capitulo: Capitulo;
}

const markdownComponents = {
    p: (props: any) => <Text fontSize={{ base: '12px', md: '14px' }} mb={2}>{props.children}</Text>,
    strong: (props: any) => <Text as="b">{props.children}</Text>,
    ul: (props: any) => (
        <Box as="ul" pl={5} style={{ listStyleType: 'disc' }} fontSize={{ base: '12px', md: '14px' }}>
            {props.children}
        </Box>
    ),
    li: (props: any) => (
        <Box as="li" mb={1}>
            {props.children}
        </Box>
    ),
};

export const CapituloCard = ({ capitulo }: CapituloCardProps) => {

    return (
        <Flex
            flexDirection='column'
            width={{ base: '100%', md: 'calc(50% - 8px)' }}
            height={{ base: '470px', md: '95%' }}
            maxH={{md: '610px'}}
            borderWidth='4px'
            borderColor='primaryButton'
            borderRadius='4px'
        >
            <Flex
                flexDirection='column'
                height='fit-content'
                maxH={{md: '50%'}}
                paddingX='8px'
                paddingTop='4px'
                paddingBottom='16px'
                borderBottomWidth='4px'
                borderColor='primaryButton'
                overflow='auto'
            >
                <Text
                    fontSize={{ base: '16px', md: '20px' }}
                    fontWeight='bold'
                    marginBottom={{ base: '4px', md: '8px' }}
                >
                    Capítulo {capitulo.codigo} - {capitulo.titulo}
                </Text>

                <ReactMarkdown components={markdownComponents}>
                    {capitulo.descricao}
                </ReactMarkdown>
            </Flex>

            <Flex
                flex={1}
                minH={0}
                overflowY="auto"
                paddingY='16px'
                justifyContent='center'
            >
                <Flex
                    flexWrap="wrap"
                    gap="16px"
                    justifyContent="center"
                    alignItems='center'
                >
                    {capitulo.nivel.map((item) => (
                        <NivelCard key={item.id} nivel={item} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}