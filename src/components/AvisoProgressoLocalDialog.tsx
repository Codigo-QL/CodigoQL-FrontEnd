import {
    Button,
    Dialog,
    Portal,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";

interface AvisoProgressoLocalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const AvisoProgressoLocalDialog = ({ isOpen, onClose, onConfirm }: AvisoProgressoLocalDialogProps) => {

    return (
        <Dialog.Root
            open={isOpen}
            size="md"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Continuar sem login?</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <VStack align="start">
                                <Text>
                                    Seu progresso será salvo apenas neste navegador. Você poderá perdê-lo se limpar os dados ou usar outro dispositivo.
                                </Text>
                                <Text>
                                    A qualquer momento, você pode fazer login com sua conta para sincronizar seu avanço e garantir que ele fique salvo.
                                </Text>
                            </VStack>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <HStack>
                                <Button
                                    backgroundColor='primaryButton'
                                    onClick={onConfirm}
                                >
                                    Continuar assim mesmo
                                </Button>
                                <Button
                                    backgroundColor='greenHighlight'
                                    onClick={onClose}
                                >
                                    Fazer Login Com Google
                                </Button>
                            </HStack>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
