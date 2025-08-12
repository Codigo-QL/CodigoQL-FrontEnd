import { Box, Flex, Icon, Tabs, Text } from '@chakra-ui/react'
import { MdArrowBack, MdScience, MdSend } from "react-icons/md"

export default function Nivel() {
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
          <Text fontSize={{ base: "16px", md: "28px" }} fontWeight="semibold">Capítulo C1 - Boas Vindas à UCC</Text>
          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="regular">Nível 1</Text>
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
                  Desconhecido
                </Flex>
              </Box>

              <Text
                fontSize={{base: "12px", md: "20px"}}
                color="primaryButton"
                flex="1"
                textAlign="justify"
                padding="4px"
              >
                Recupere todos os dados da testemunha chamada Roberto, que possui o RG 12.345.678-9, na tabela pessoa. Se precisar de ajuda, consulte a aba “Dica” para mais informações.
              </Text>
            </Flex>
            <Tabs.Content
              value="caso"
              padding="0px"
              flex="1"
              minH={0}
              overflowY="auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia mattis dolor sit amet blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In interdum elit nec nisi blandit, quis convallis risus pulvinar. Maecenas semper lectus sed venenatis consectetur. Nam facilisis elementum vehicula. Vivamus et gravida mauris. Mauris a leo accumsan, dictum libero eget, faucibus justo. Nulla elementum dui et felis euismod, a vehicula arcu ullamcorper. Fusce molestie condimentum sollicitudin. Quisque augue tellus, porta non lectus sed, pretium sagittis augue. Cras suscipit nunc augue. Etiam condimentum enim ut dolor finibus, vel dapibus dui cursus. Aliquam sit amet velit metus. Suspendisse viverra ligula eu rhoncus vestibulum.

              Pellentesque non aliquam velit. Sed ullamcorper, metus vitae pulvinar efficitur, magna augue ultrices lacus, at vulputate lorem quam quis sem. Nulla tristique rutrum dui. Aliquam pellentesque suscipit dapibus. Aenean eu rhoncus ipsum. Sed eget purus vitae eros tincidunt tempor nec a ex. Curabitur sed blandit metus. Nulla eget feugiat felis. Morbi nec pretium tellus. Etiam ultrices porta velit, vitae feugiat neque ullamcorper vitae. Aliquam erat volutpat. Suspendisse potenti.
            </Tabs.Content>
            <Tabs.Content value="dica">
              Manage your projects
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
