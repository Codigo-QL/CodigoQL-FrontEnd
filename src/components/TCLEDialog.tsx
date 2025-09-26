import {
    Button,
    Dialog,
    Portal,
    Text,
    Box,
} from "@chakra-ui/react";

interface TCLEProps {
    isOpen: boolean;
    onClick: () => void;
}

export const TCLE = ({ isOpen, onClick }: TCLEProps) => {

    return (
        <Dialog.Root
            open={isOpen}
            closeOnEscape={false}
            closeOnInteractOutside={false}
            scrollBehavior="inside"
            size="xl"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Termo de Consentimento Livre e Esclarecido (TCLE)</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Box divideY="2px">
                                <Text whiteSpace="pre-wrap" textAlign="justify">
                                    Você está sendo convidado(a) para participar, como voluntário(a), em uma pesquisa científica. Caso você não queira participar, não há problema algum e não haverá qualquer punição. Este TCLE refere-se a um TCC cujo objetivo é avaliar a eficácia da plataforma de estudos "Código-QL", que propõe uma abordagem prática e lúdica para o ensino de consultas SQL.{'\n\n'}
                                    A coleta de dados para a presente pesquisa será realizada por meio do seu uso da plataforma. Sua atividade consistirá em resolver exercícios práticos de SQL, que são apresentados de forma progressiva e contextualizados dentro de uma narrativa de investigação. Para a análise dos resultados, será necessário que você realize o login com sua conta Google. Seu engajamento na plataforma é determinante para a qualidade da pesquisa.{'\n\n'}
                                    Seu e-mail, obtido através do login, será utilizado unicamente para comunicações essenciais da pesquisa, como o envio de formulários de avaliação e feedback sobre a plataforma. Sua identidade será mantida em total sigilo, com os dados apresentados sempre de forma agregada e anônima.{'\n\n'}
                                    Sua participação nesta pesquisa é de caráter voluntário e não será remunerada. Caso decida desistir, você poderá interromper o uso da plataforma a qualquer momento, sem nenhuma restrição ou punição. Para entrar em contato, por gentileza, encaminhe um e-mail para: natan.santana.dev@gmail.com.
                                </Text>

                                <Text paddingTop='4px' whiteSpace="pre-wrap" textAlign="justify" fontStyle="italic">
                                    Ao realizar o login com minha conta Google e prosseguir com o uso da plataforma, concordo em participar voluntariamente do presente estudo. Entendo que poderei interromper minha participação a qualquer momento, sem necessidade de explicação, bastando deixar de usar a ferramenta, e que esta decisão não me trará penalidade.
                                </Text>
                            </Box>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button
                                colorScheme="blue"
                                onClick={onClick}
                            >
                                Concordo e Fazer Login com Google
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
