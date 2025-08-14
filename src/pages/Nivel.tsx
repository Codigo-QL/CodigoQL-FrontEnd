import { Alert, Box, Code, CodeBlock, Flex, Float, Icon, IconButton, Image, Spinner, Tabs, Text } from '@chakra-ui/react'
import { MdArrowBack, MdScience, MdSend } from "react-icons/md"
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import api from '../services/api';

interface NivelData {
  id: number;
  narrativa: string;
  enunciado: string;
  dica: string;
  capitulo: {
    codigo: string;
    titulo: string;
  };
  personagem: {
    nome: string;
    imagem: { [key: string]: number } | null;
  };
}

export default function Nivel() {
  const { id } = useParams<{ id: string }>();
  const [nivel, setNivel] = useState<NivelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markdownComponents = {
    p: (props: any) => <Text mb="4" {...props} />,
    code({ node, inline, className, children, ...props }: any) {
      if (!inline) {
        return (
          <CodeBlock.Root code={String(children).replace(/\n$/, '')} language='sql'>
            <CodeBlock.Content>
              <Float placement="top-end" offset="5" zIndex="1">
                <CodeBlock.CopyTrigger asChild>
                  <IconButton variant="ghost" size="2xs">
                    <CodeBlock.CopyIndicator />
                  </IconButton>
                </CodeBlock.CopyTrigger>
              </Float>
              <CodeBlock.Code>
                <pre style={{ padding: '1rem', margin: 0 }}>
                  <code {...props}>{children}</code>
                </pre>
              </CodeBlock.Code>
            </CodeBlock.Content>
          </CodeBlock.Root>
        );
      }

      return (
        <Code fontSize="sm" className={className} {...props}>
          {children}
        </Code>
      );
    },
  };

  const imageUrl = useMemo(() => {
    if (nivel?.personagem?.imagem) {
      const imageData = Object.values(nivel.personagem.imagem);

      if (imageData.length > 0) {
        let binaryString = '';
        const chunkSize = 8192;
        for (let i = 0; i < imageData.length; i += chunkSize) {
          const chunk = imageData.slice(i, i + chunkSize);
          binaryString += String.fromCharCode.apply(null, chunk);
        }

        const base64String = btoa(binaryString);
        return `data:image/png;base64,${base64String}`;
      }
    }
    return '';
  }, [nivel]);

  useEffect(() => {
    if (id) {
      api.get(`/niveis/${id}`)
        .then(response => {
          setNivel(response.data);
        })
        .catch(err => {
          console.error("Erro ao buscar nível:", err);
          setError("Não foi possível carregar os dados do nível.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert.Root margin="0px" status="error" variant="solid">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Ocorreu um Erro!</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!nivel) {
    return (
      <Alert.Root margin="0px" status="warning" variant="solid">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Aviso</Alert.Title>
          <Alert.Description>Nível não encontrado.</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Box
      height="100%"
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        paddingTop="32px"
        marginBottom="16px"
      >
        <Box
          aria-label="Voltar"
          position="absolute"
          left="0"
          marginLeft="16px"
          cursor="pointer"
        >
          <Icon
            size={{ base: "md", md: "2xl" }}
          >
            <MdArrowBack />
          </Icon>
        </Box>

        <Flex direction="column" align="center">
          <Text fontSize={{ base: "16px", md: "28px" }} fontWeight="semibold">{nivel.capitulo.codigo} - {nivel.capitulo.titulo}</Text>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="regular">Nível {nivel.id}</Text>
        </Flex>
      </Flex>

      <Flex
        paddingLeft="16px"
        paddingRight="16px"
        width="100%"
        height={{ base: "85%", md: "80%" }}
        gap="16px"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Tabs.Root
          defaultValue="caso"
          variant="outline"
          justify="end"
          width="100%"
          height={{ base: "55%", md: "100%" }}
          display="flex"
          flexDirection="column"
        >
          <Tabs.List
            minH={{ base: "23px", md: "32px" }}
          >
            <Tabs.Trigger
              value="caso"
              bg="secondaryBackground"
              color="primaryText"
              _selected={{ bg: "primaryButton" }}
              marginRight="8px"
              width={{ base: "59px", md: "104px" }}
              height={{ base: "23px", md: "32px" }}
              fontSize={{ base: "14px", md: "24px" }}
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Caso
            </Tabs.Trigger>
            <Tabs.Trigger
              value="dica"
              bg="secondaryBackground"
              color="primaryText"
              _selected={{ bg: "primaryButton" }}
              width={{ base: "59px", md: "104px" }}
              height={{ base: "23px", md: "32px" }}
              fontSize={{ base: "14px", md: "24px" }}
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Dica
            </Tabs.Trigger>
          </Tabs.List>

          <Box
            borderWidth="4px"
            borderColor="primaryButton"
            flex="1"
            minH={0}
            display="flex"
            flexDirection="column"
          >
            <Flex>
              <Box
                flexShrink={0}
                width={{ base: "132px", md: "204px" }}
                height={{ base: "154px", md: "235px" }}
              >
                <Flex
                  backgroundColor="primaryButton"
                  height={{ base: "128px", md: "200px" }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`Imagem de ${nivel.personagem.nome}`}
                      maxH="100%"
                      maxW="100%"
                      objectFit="cover"
                    />
                  ) : null}
                </Flex>
                <Flex
                  height={{ base: "26px", md: "35px" }}
                  backgroundColor="secondaryBackground"
                  borderRadius="0px 0px 4px 0px"
                  fontSize={{ base: "12px", md: "20px" }}
                  fontWeight="bold"
                  color="primaryText"
                  textAlign="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  {nivel.personagem.nome}
                </Flex>
              </Box>

              <Text
                fontSize={{ base: "12px", md: "20px" }}
                color="primaryButton"
                flex="1"
                textAlign="justify"
                padding="4px"
              >
                {nivel.enunciado}
              </Text>
            </Flex>
            <Tabs.Content
              value="caso"
              padding="4px"
              flex="1"
              minH={0}
              overflowY="auto"
            >
              <ReactMarkdown components={markdownComponents}>
                {nivel.narrativa}
              </ReactMarkdown>
            </Tabs.Content>
            <Tabs.Content
              value="dica"
              padding="4px"
              flex="1"
              minH={0}
              overflowY="auto"
            >
              <ReactMarkdown components={markdownComponents}>
                {nivel.dica}
              </ReactMarkdown>
            </Tabs.Content>
          </Box>
        </Tabs.Root>

        <Flex
          width="100%"
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Tabs.Root
            defaultValue="sql"
            variant="outline"
            justify="end"
            width="100%"
            height="90%"
            display="flex"
            flexDirection="column"
          >
            <Tabs.List
              minH={{ base: "23px", md: "32px" }}
            >
              <Tabs.Trigger
                value="sql"
                bg="secondaryBackground"
                color="primaryText"
                _selected={{ bg: "primaryButton" }}
                marginRight="8px"
                width={{ base: "59px", md: "104px" }}
                height={{ base: "23px", md: "32px" }}
                fontSize={{ base: "14px", md: "24px" }}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                SQL
              </Tabs.Trigger>
              <Tabs.Trigger
                value="resultado"
                bg="secondaryBackground"
                color="primaryText"
                _selected={{ bg: "primaryButton" }}
                width={{ base: "59px", md: "104px" }}
                height={{ base: "23px", md: "32px" }}
                fontSize={{ base: "14px", md: "24px" }}
                fontWeight="bold"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Resultado
              </Tabs.Trigger>
            </Tabs.List>

            <Box
              borderWidth="4px"
              borderColor="primaryButton"
              height="100%"
            >
              <Tabs.Content value="sql" height="100%">
                Manage your team members
              </Tabs.Content>
              <Tabs.Content value="resultado" height="100%">
                Manage your projects
              </Tabs.Content>
            </Box>
          </Tabs.Root>

          <Flex
            alignSelf="flex-end"
            gap="12px"
          >
            <Flex
              width={{ base: "73px", md: "134px" }}
              height={{ base: "31px", md: "48px" }}
              backgroundColor="primaryButton"
              borderRadius="8px"
              alignItems="center"
              justifyContent="center"
              gap="4px"
              cursor="pointer"
            >
              <Icon
                width={{ base: "18px", md: "34px" }}
                height={{ base: "18px", md: "34px" }}
                color="secondaryBackground"
              >
                <MdScience />
              </Icon>

              <Text
                color="primaryText"
                fontSize={{ base: "14px", md: "32px" }}
                fontWeight="bold"
              >
                Testar
              </Text>
            </Flex>

            <Flex
              width={{ base: "73px", md: "134px" }}
              height={{ base: "31px", md: "48px" }}
              backgroundColor="secondaryBackground"
              borderRadius="8px"
              alignItems="center"
              justifyContent="center"
              gap="4px"
              cursor="pointer"
            >
              <Icon
                width={{ base: "18px", md: "34px" }}
                height={{ base: "18px", md: "34px" }}
                color="primaryButton"
              >
                <MdSend />
              </Icon>

              <Text
                color="primaryText"
                fontSize={{ base: "14px", md: "32px" }}
                fontWeight="bold"
              >
                Enviar
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

    </Box>
  )
}
