import { Flex, Image, Text } from "@chakra-ui/react"

interface NivelCardProps {
    image: string;
    nivelId: number;
}

export const NivelCard = ({ image, nivelId } : NivelCardProps) => {

    return (
        <Flex
            flexDirection='column'
            width={{ base: '100px', md: '120px' }}
            height={{ base: '100px', md: '120px' }}
            borderRadius='4px'
        >
            <Flex
                backgroundColor='primaryButton'
                flex={1}
                borderTopRadius='4px'
            >
                <Image src={image} />
            </Flex>

            <Flex
                backgroundColor='secondaryBackground'
                height='22px'
                borderBottomRadius='4px'
                alignItems='center'
                justifyContent='center'
            >
                <Text
                    color='primaryText'
                    textAlign='center'
                >
                    Nível {nivelId}
                </Text>
            </Flex>
        </Flex>
    )
}