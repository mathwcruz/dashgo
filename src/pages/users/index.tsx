import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Icon,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { UserHeader } from "../../components/UserHeader";

import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function userList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(["user", userId], async() => {
      const { data } = await api.get(`users/${userId}`);
      return data;
    }, {
      staleTime: 1000 * 60 * 10 // => 10 minutos
    });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Head>
        <title>Usuários | dashgo</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <UserHeader title="Usuários" />
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" /> }
              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </Flex>

            {isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter os dados dos usuários</Text>
              </Flex>
            ) : (
              <>
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
                            <Link color="pink.400" onMouseEnter={() => handlePrefetchUser("")}>
                              <Text fontWeight="bold">Matheus da Cruz</Text>
                            </Link>
                            <Text
                              fontSize="sm"
                              color="gray.300"
                              fontWeight="bold"
                            >
                              matheuswachcruz@gmail.com
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>14 de maio de 2021</Td>}
                      </Tr>
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data?.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

/*
Integração do React Query com SSR:

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
      totalCount,
    },
  };
};
*/