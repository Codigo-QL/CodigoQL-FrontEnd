import {
    Button,
    Dialog,
    Input,
    Portal,
    Text,
    Field,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";

interface MatriculaDialogProps {
    isOpen: boolean;
    onSubmit: (matricula: string) => void;
}

export const MatriculaDialog = ({ isOpen, onSubmit }: MatriculaDialogProps) => {
    const [matriculaInput, setMatriculaInput] = useState('');
    const [isMatriculaInvalid, setIsMatriculaInvalid] = useState(false);

    const handleMatriculaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setMatriculaInput(value);
            setIsMatriculaInvalid(false);
        } else {
            setIsMatriculaInvalid(true);
        }
    };

    const handleSubmit = () => {
        if (matriculaInput.trim() && !isMatriculaInvalid) {
            onSubmit(matriculaInput);
        }
    };

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
                                    A coleta de dados para a presente pesquisa será realizada por meio do seu uso da plataforma. Sua atividade consistirá em resolver exercícios práticos de SQL, que são apresentados de forma progressiva e contextualizados dentro de uma narrativa de investigação. Para a análise dos resultados, será necessário que você informe sua matrícula. Seu engajamento na plataforma é determinante para a qualidade da pesquisa.{'\n\n'}
                                    Sua participação nesta pesquisa é de caráter voluntário e não será remunerada. Caso decida desistir, você poderá interromper o uso da plataforma a qualquer momento, sem nenhuma restrição ou punição.{'\n\n'}
                                    Os dados coletados serão utilizados para a análise dos resultados obtidos na Monografia de TCC, bem como em eventuais publicações científicas. Sua matrícula será usada unicamente para correlacionar o uso da ferramenta com o desempenho acadêmico, e sua identidade será mantida em total sigilo, com os dados apresentados sempre de forma agregada e anônima. Para entrar em contato, por gentileza, encaminhe um e-mail para: natan.santana.dev@gmail.com.
                                </Text>

                                <Text paddingTop='4px' whiteSpace="pre-wrap" textAlign="justify" fontStyle="italic">
                                    Ao informar minha matrícula e prosseguir com o uso da plataforma, concordo em participar voluntariamente do presente estudo. Entendo que poderei interromper minha participação a qualquer momento, sem necessidade de explicação, bastando deixar de usar a ferramenta, e que esta decisão não me trará penalidade.
                                </Text>
                            </Box>


                            <Field.Root invalid={isMatriculaInvalid} mt={4}>
                                <Input
                                    placeholder="Digite sua matrícula (apenas números)"
                                    value={matriculaInput}
                                    onChange={handleMatriculaInputChange}
                                />
                                <Field.ErrorText>
                                    Por favor, digite apenas números.
                                </Field.ErrorText>
                            </Field.Root>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                disabled={!matriculaInput.trim() || isMatriculaInvalid}
                            >
                                Concordo e Enviar Matrícula
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};