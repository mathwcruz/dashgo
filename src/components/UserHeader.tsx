import { Heading } from "@chakra-ui/layout";

interface UserHeaderProps {
  title: string;
};

export function UserHeader({ title }: UserHeaderProps) {
  return (
    <Heading size="lg" fontWeight="normal">
      {title}
    </Heading>
  );
};
