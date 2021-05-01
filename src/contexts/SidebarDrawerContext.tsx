import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
};

type SidebarDrawerContextData = UseDisclosureReturn; //retorno do hook useDisclosure

const SideBarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const { asPath } = useRouter();

  // fechando a Sidebar após o usuário navegar para outro rota
  useEffect(() => {
    disclosure.onClose();
  }, [asPath]);

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      { children }
    </SideBarDrawerContext.Provider>
  );
};

export const useSidebarDrawer = () => {
  return useContext(SideBarDrawerContext);
};