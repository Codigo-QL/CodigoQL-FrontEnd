import React from 'react';
import { Alert, Box, Table, Text } from '@chakra-ui/react';

type QueryResult = {
  columns: string[];
  values: any[][];
};

interface ResultadoCardProps {
  queryResult: QueryResult[] | null;
  queryError: string | null;
}

const ResultadoCardComponent = ({ queryResult, queryError }: ResultadoCardProps) => {
  return (
    <>
      {queryError && (
        <Alert.Root status='error' variant="solid" borderRadius="md">
          <Alert.Indicator />
          <Alert.Title>Erro na Query!</Alert.Title>
          <Alert.Description>{queryError}</Alert.Description>
        </Alert.Root>
      )}

      {!queryError && queryResult && (
        queryResult.map((result, index) => (
          <Box key={index} mb={6} width="100%">
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

      {queryResult && !queryResult.length && (
        <Text>A query foi executada com sucesso, mas não retornou resultados.</Text>
      )}
    </>
  );
};

export const ResultadoCard = React.memo(ResultadoCardComponent);
