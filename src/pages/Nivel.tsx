import { Alert, Box, Button, CloseButton, Code, CodeBlock, Dialog, Flex, Float, Icon, IconButton, Image, Portal, Spinner, Table, Tabs, Text, createHighlightJsAdapter } from '@chakra-ui/react'
import { MdArrowBack, MdScience, MdSend } from "react-icons/md"
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import initSqlJs, { type Database } from 'sql.js';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import hljs, { ensureSqlLanguageIsRegistered } from '../services/highlight';
import 'highlight.js/styles/github-dark.css';
import { MatriculaDialog } from '../components/MatriculaDialog';

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
  codigo_base: string;
  hasNextLevel: boolean;
}

type QueryResult = {
  columns: string[];
  values: any[][];
};

const highlightJsAdapter = createHighlightJsAdapter({
  load: async () => {
    ensureSqlLanguageIsRegistered();
    return hljs;
  },
});


const markdownComponents = {
  p: (props: any) => <Text mb="4" {...props} />,
  code({ node, inline, className, children, ...props }: any) {
    if (!inline) {
      return (
        <CodeBlock.AdapterProvider value={highlightJsAdapter}>
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
                <CodeBlock.CodeText />
              </CodeBlock.Code>
            </CodeBlock.Content>
          </CodeBlock.Root>
        </CodeBlock.AdapterProvider>
      );
    }

    return (
      <Code fontSize="sm" className={className} {...props}>
        {children}
      </Code>
    );
  },
};

export default function Nivel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nivel, setNivel] = useState<NivelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>('SELECT * FROM pessoa;');
  const [db, setDb] = useState<Database | null>(null);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [queryResult, setQueryResult] = useState<QueryResult[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [activeQueryTab, setActiveQueryTab] = useState('sql');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<{ correct: boolean; feedback: string } | null>(null);
  const [isMatriculaDialogOpen, setMatriculaDialogOpen] = useState(false);

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

  const handleTestQuery = () => {
    if (!db) {
      setQueryError("O banco de dados ainda não foi carregado.");
      return;
    }

    try {
      setQueryError(null);

      const results = db.exec(code);

      setQueryResult(results);

    } catch (err: any) {
      console.error("Erro ao executar a query:", err.message);

      setQueryResult(null);
      setQueryError(err.message);
    } finally {
      setActiveQueryTab('resultado');
    }
  };

  const sendValidationRequest = async () => {
    if (!id) return;
    setIsSubmitting(true);
    setValidationResult(null);

    let sessaoId = localStorage.getItem('sessao_id');
    if (!sessaoId) {
      sessaoId = uuidv4();
      localStorage.setItem('sessao_id', sessaoId);
    }

    const matricula = localStorage.getItem('matricula');

    try {
      const response = await api.post(`/niveis/validate/${id}`, {
        userQuery: code,
        sessao_id: sessaoId,
        matricula: matricula
      });
      setValidationResult(response.data);

      if (response.data.correct) {
        const completedLevelsRaw = localStorage.getItem('completedLevels');
        const completedLevels = completedLevelsRaw ? JSON.parse(completedLevelsRaw) : [];

        const currentLevelId = Number(id);
        if (!completedLevels.includes(currentLevelId)) {
          completedLevels.push(currentLevelId);
        }

        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
      }
    } catch (err) {
      console.error("Erro ao enviar a resposta:", err);
      setValidationResult({
        correct: false,
        feedback: "Não foi possível validar sua resposta. Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMatriculaSubmit = (matricula: string) => {
    localStorage.setItem('matricula', matricula);
    setMatriculaDialogOpen(false);
  };

  useEffect(() => {
    const matricula = localStorage.getItem('matricula');
    if (!matricula) {
      setMatriculaDialogOpen(true);
    }
  }, []);

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

  useEffect(() => {
    if (nivel?.codigo_base) {
      const loadDatabase = async () => {
        setIsDbLoading(true);
        setDbError(null);
        try {
          const response = await api.get(`/niveis/database/${nivel.codigo_base}`);

          const base64Data = response.data.data;

          const binaryString = atob(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const SQL = await initSqlJs({
            locateFile: file => `/${file}`
          });

          setDb(new SQL.Database(bytes));

        } catch (err) {
          console.error("Erro ao carregar o banco de dados:", err);
          setDbError("Não foi possível configurar o banco de dados para este nível.");
        } finally {
          setIsDbLoading(false);
        }
      };

      loadDatabase();
    } else if (nivel) {
      setIsDbLoading(false);
    }
  }, [nivel]);

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
          height={{ base: "40%", md: "100%" }}
          gap="16px"
          flexDirection="column"
        >
          <Tabs.Root
            value={activeQueryTab}
            onValueChange={(details) => setActiveQueryTab(details.value)}
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
              overflowY="auto"
              flex="1"
              minH={0}
              display="flex"
              flexDirection="column"
            >
              <Tabs.Content padding={0} value="sql" height="100%">

                {isDbLoading ? (
                  <Flex direction="column" align="center" justify="center" height="100%">
                    <Spinner size="xl" />
                    <Text mt={4}>Configurando banco de dados...</Text>
                  </Flex>
                ) : dbError ? (
                  <Text p={4} color="red.500">{dbError}</Text>
                ) : (
                  <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={(code) => {
                      ensureSqlLanguageIsRegistered();
                      return hljs.highlight(code, { language: 'sql' }).value;
                    }}
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 16,
                      height: '100%',
                    }}
                    className="hljs"
                  />
                )}
              </Tabs.Content>
              <Tabs.Content value="resultado" height="100%" p={4} overflowY="auto">
                {queryError && (
                  <Alert.Root status='error' variant="solid" borderRadius="md">
                    <Alert.Indicator />
                    <Alert.Title>Erro na Query!</Alert.Title>
                    <Alert.Description>{queryError}</Alert.Description>
                  </Alert.Root>
                )}

                {!queryError && queryResult && (
                  queryResult.map((result, index) => (
                    <Box key={index} mb={6}>
                      {result.values.length > 0 ? (
                        <Table.Root>
                          <Table.Header>
                            <Table.Row bg="secondaryBackground">
                              {result.columns.map((columnName) => (
                                <Table.ColumnHeader key={columnName} color="primaryText" textAlign="center">
                                  {columnName}
                                </Table.ColumnHeader>
                              ))}
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {result.values.map((row, rowIndex) => (
                              <Table.Row key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <Table.Cell key={cellIndex} textAlign="center">{cell}</Table.Cell>
                                ))}
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table.Root>
                      ) : (
                        <Text>A query foi executada com sucesso, mas não retornou resultados.</Text>
                      )}
                    </Box>
                  ))
                )}

                {!queryError && !queryResult && (
                  <Text>O resultado da sua query aparecerá aqui.</Text>
                )}
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
                onClick={handleTestQuery}
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
              cursor={isSubmitting ? 'disabled' : 'pointer'}
              onClick={isSubmitting ? () => null : sendValidationRequest}
            >
              {isSubmitting ? (
                <Spinner size="sm" color="primaryText" />
              ) : (
                <>
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
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Dialog.Root
        open={!!validationResult}
        onOpenChange={(details) => {
          if (!details.open) setValidationResult(null);
        }}
        size={{ base: 'xs', md: 'md' }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title
                  color={validationResult?.correct ? 'green' : 'red'}
                >
                  {validationResult?.correct ? "Resposta Correta!" : "Tente Novamente!"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {validationResult?.feedback}
              </Dialog.Body>
              <Dialog.Footer>
                {validationResult?.correct ? (
                  <Flex gap={3}>
                    <Dialog.ActionTrigger asChild>
                      <Button onClick={() => navigate('/')} backgroundColor='primaryButton'>
                        Voltar ao Menu
                      </Button>
                    </Dialog.ActionTrigger>
                    {
                      nivel?.hasNextLevel && (
                        <Dialog.ActionTrigger asChild>
                          <Button
                            backgroundColor='secondaryBackground'
                            onClick={() => {
                              const currentLevel = Number(id || 1);
                              navigate(`/nivel/${currentLevel + 1}`);
                            }}
                          >
                            Próximo Nível
                          </Button>
                        </Dialog.ActionTrigger>
                      )
                    }
                  </Flex>
                ) : (
                  <Dialog.ActionTrigger asChild>
                    <Button backgroundColor='primaryButton'>Tentar Novamente</Button>
                  </Dialog.ActionTrigger>
                )}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <MatriculaDialog 
        isOpen={isMatriculaDialogOpen}
        onSubmit={handleMatriculaSubmit}
      />
    </Box>
  )
}
