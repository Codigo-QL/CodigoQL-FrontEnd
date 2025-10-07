import { Box, Flex, Icon, Image, Spinner, Text } from "@chakra-ui/react";
import { Tooltip } from "../components/ui/tooltip"
import LogoHeader from "../assets/LogoHeader.svg";
import { CapituloCard } from "../components/CapituloCard";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

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
    const [showReview, setShowReview] = useState(false);
    const { user, loading } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCapitulos = async () => {
            try {
                const response = await api.get('/capitulos');
                setCapitulos(response.data);

                let niveisCompletos = 0;

                if (user) {
                    response.data.forEach((capitulo: Capitulo) => {
                        capitulo.nivel.forEach(nivel => {
                            if (nivel._count && nivel._count.submissao > 0) {
                                niveisCompletos++;
                            }
                        });
                    });
                } else {
                    const progressoLocal = localStorage.getItem('completedLevels');
                    if (progressoLocal) {
                        const niveisConcluidosIds: number[] = JSON.parse(progressoLocal);
                        niveisCompletos = niveisConcluidosIds.length;
                    }
                }

                if (niveisCompletos >= 10) {
                    setShowReview(true);
                }
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
    }, [user, loading]);

    return (
        <Flex
            height='100dvh'
            flexDirection='column'

        >
            {
                showReview && <Tooltip
                    showArrow
                    content="Clique aqui para avaliar a plataforma!"
                    positioning={{ placement: "bottom" }}
                    openDelay={0}
                    defaultOpen={true}
                >
                    <Box
                        aria-label="Avaliar Plataforma"
                        position="absolute"
                        right="0"
                        marginRight={{ base: '16px', md: "32px" }}
                        marginTop={{ base: '35px', md: "32px" }}
                        cursor="pointer"
                        onClick={() => window.open('https://forms.gle/7nfpVmPDnDaQpBw69', '_blank')}
                        backgroundColor="greenHighlight"
                        padding="8px"
                        borderRadius="100px"
                    >
                        <Icon
                            size='2xl'
                        >
                            <FaRegStar />
                        </Icon>
                    </Box>
                </Tooltip>
            }
            <Box
                aria-label="Voltar"
                position="absolute"
                left="0"
                marginLeft={{ base: '16px', md: "32px" }}
                marginTop={{ base: '50px', md: "32px" }}
                cursor="pointer"
                onClick={() => navigate("/")}
            >
                <Icon
                    size='2xl'
                >
                    <MdArrowBack />
                </Icon>
            </Box>
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
