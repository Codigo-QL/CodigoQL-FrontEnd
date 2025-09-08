import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import LogoHeader from "../assets/LogoHeader.svg";
import { CapituloCard } from "../components/CapituloCard";
import { useEffect, useState } from "react";
import api from "../services/api";

export interface Nivel {
    id: number;
    personagem: {
        nome: string;
    };
}

export interface Capitulo {
    codigo: string;
    titulo: string;
    descricao: string;
    nivel: Nivel[];
}

export default function Capitulos() {
    const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get('/capitulos')
            .then(response => {
                setCapitulos(response.data);
            })
            .catch(err => {
                console.error("Erro ao buscar capítulos:", err);
                setError("Não foi possível carregar os capítulos.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                    width='115px'
                    marginTop='32px'
                    marginBottom={{ base: '12px', md: '16px' }}
                    userSelect='none'
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
                    fontSize={{ base: '20px', md: '30px' }}
                    marginBottom='8px'
                    userSelect='none'
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

                    {loading && <Spinner size="xl" />}
                    {error && <Text color="red.500">{error}</Text>}
                    {!loading && !error && capitulos.map(capitulo => (
                        <CapituloCard key={capitulo.codigo} capitulo={capitulo} />
                    ))}

                </Flex>
            </Flex>
        </Flex>
    )
}