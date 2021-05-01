import {
  Drawer as  ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { ReactElement } from "react";

interface DrawerSidebarProps {
  children: ReactElement;
  description: string;
  isOpen: boolean;
  onClose: () => void;
};

export function Drawer({ description, isOpen, onClose, children }: DrawerSidebarProps) {
  return (
    <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" p="4">
          <DrawerCloseButton mt="6" />
          <DrawerHeader>{description}</DrawerHeader>

          <DrawerBody>
            {children}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  );
}
