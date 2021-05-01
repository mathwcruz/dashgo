import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurent?: boolean;
  page: number;
}

export function PaginationItem({
  isCurent = false,
  page,
}: PaginationItemProps) {
  if (isCurent) {
    //se for o botão atual
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursos: "default",
        }}
      >
        {page}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{ bg: "gray.500" }}
    >
      {page}
    </Button>
  );
}
