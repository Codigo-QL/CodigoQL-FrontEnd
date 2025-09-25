import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import LogoHeader from "../assets/LogoHeader.svg";
import { CapituloCard } from "../components/CapituloCard";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export interface Nivel {
    id: number;
    personagem: {
        nome: string;
    };
    _count?: {
        submissao: number;
    }
}

export interface Capitulo {
    codigo: string;
    titulo: string;
    descricao: string;
    nivel: Nivel[];
}

export default function Capitulos() {
    const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
    const [contentLoading, setContentLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, loading } = useAuth();

    useEffect(() => {
        const fetchCapitulos = async () => {
            try {
                const response = await api.get('/capitulos');
                setCapitulos(response.data);
            } catch (error) {
                console.error("Erro ao buscar capítulos:", error);
                setError("Não foi possível carregar os capítulos.");
            } finally {
                setContentLoading(false);
            }
        };
        if (!loading) {
            fetchCapitulos();
        }
    }, [user]);

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
                    fontSize={{ base: '20px', md: '25px' }}
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

                    {contentLoading && <Spinner size="xl" />}
                    {error && <Text color="red.500">{error}</Text>}
                    {!contentLoading && !error && capitulos.map(capitulo => (
                        <CapituloCard key={capitulo.codigo} capitulo={capitulo} />
                    ))}

                </Flex>
            </Flex>
        </Flex>
    )
}