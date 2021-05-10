import {
  Box,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
} from "@chakra-ui/react";

interface TableDashboardProps {
  isWideVersion: boolean;
}

// continuar a componentização depois q tiver dados retornados da API

export function TableDashboard({ isWideVersion }: TableDashboardProps) {
  return (
    <Table colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color="gray.300" w="8">
            <Checkbox colorScheme="pink" />
          </Th>
          <Th>Usuário</Th>
          {isWideVersion && <Th>Data de cadastro</Th>}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td px={["4", "4", "6"]}>
            <Checkbox colorScheme="pink" />
          </Td>
          <Td>
            <Box>
              <Text fontWeight="bold">Matheus da Cruz</Text>
              <Text fontSize="sm" color="gray.300" fontWeight="bold">
                matheuswachcruz@gmail.com
              </Text>
            </Box>
          </Td>
          {isWideVersion && <Td>29 de abril de 2021</Td>}
        </Tr>
      </Tbody>
    </Table>
  );
}
