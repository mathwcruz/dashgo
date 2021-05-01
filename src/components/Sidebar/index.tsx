import {
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
 
import { Drawer } from "./Drawer";
import { SidebarNav } from "./SidebarNav";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer description="Navegação" isOpen={isOpen} onClose={onClose} >
        <SidebarNav />
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}
