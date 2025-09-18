import { Flex, Image, Text } from "@chakra-ui/react"
import type { Nivel } from "../pages/Capitulos";
import { useNavigate } from "react-router-dom";

interface NivelCardProps {
    nivel: Nivel;
}

export const NivelCard = ({ nivel }: NivelCardProps) => {
    const navigate = useNavigate();
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/personagens/${nivel.personagem.nome}/imagem`;

    const completedLevelsRaw = localStorage.getItem('completedLevels');
    const completedLevels = completedLevelsRaw ? JSON.parse(completedLevelsRaw) : [];
    const isCompleted = completedLevels.includes(nivel.id);

    return (
        <Flex
            flexDirection='column'
            width={{ base: '100px', md: '100px' }}
            height={{ base: '122px', md: '102px' }}
            borderRadius='4px'
            cursor='pointer'
            onClick={() => navigate(`/nivel/${nivel.id}`)}
        >
            <Flex
                flex={1}
                borderTopRadius='4px'
                justifyContent='center'
                backgroundColor='#FFFFFF'
            >
                <Image
                    borderTopRadius='4px'
                    src={imageUrl}
                    alt={`Imagem do nível ${nivel.id}`}
                    width={{ base: '100px', md: '80px' }}
                    height={{ base: '100px', md: '80px' }}
                    objectFit='fill'
                />
            </Flex>

            <Flex
                backgroundColor={isCompleted ? 'greenHighlight' : 'secondaryBackground'}
                height='22px'
                borderBottomRadius='4px'
                alignItems='center'
                justifyContent='center'
            >
                <Text
                    color='primaryText'
                    textAlign='center'
                    fontSize='12px'
                >
                    Nível {nivel.id}{isCompleted ? ' - Concluído' : ''}
                </Text>
            </Flex>
        </Flex>
    )
}