import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Matheus da Cruz</Text>
          <Text fontSize="small" color="gray.300">
            matheuswachcruz@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Matheus da Cruz"
        src="https://avatars.githubusercontent.com/u/68445791?v=4"
      />
    </Flex>
  );
};
