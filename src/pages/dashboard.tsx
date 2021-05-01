import dynamic from "next/dynamic";
import Head from "next/head";
import { Flex, SimpleGrid, Box, Text } from "@chakra-ui/react";
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // o gráfico só será carregado pelo lado do browser, nunca do Next
}); //lib para gráfico

import { options, series } from "../utils/chartConfig";

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | dashgo</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box p={["6", "8"]} pb="4" bg="gray.800" borderRadius={8}>
              <Text fontSize="lg" mb="4">
                Inscritos da semana
              </Text>
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            </Box>
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
              <Text fontSize="lg" mb="4">
                Taxa de abertura
              </Text>
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}
