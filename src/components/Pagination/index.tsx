import { Box, Stack, Text } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)] // ex: from: 3, to: 6. O Array terá 3 posições, pois é 6 - 3 = 3
    .map((_, index) => {
      return from + index + 1; // criando as páginas 4, 5 e 6
    })
    .filter((page) => page > 0); // filtrando apenas as páginas que são maiores que 0
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - SIBLINGS_COUNT, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + SIBLINGS_COUNT, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>50</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + SIBLINGS_COUNT && (
          <>
            <PaginationItem onPageChange={onPageChange} page={1} />
            {currentPage > 2 + SIBLINGS_COUNT && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((
            page // renderizando as páginas anteriores, caso tenha
          ) => <PaginationItem onPageChange={onPageChange} key={page} page={page} />)}

        <PaginationItem onPageChange={onPageChange} page={currentPage} isCurent />

        {nextPages.length > 0 &&
          nextPages.map((
            page // renderizando as próximas páginas, caso tenha
          ) => <PaginationItem onPageChange={onPageChange} key={page} page={page} />)}

        {currentPage + SIBLINGS_COUNT < lastPage && (
          <>
            <PaginationItem onPageChange={onPageChange} page={lastPage} />
            {currentPage + 1 + SIBLINGS_COUNT < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}
