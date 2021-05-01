import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Button,
} from "@chakra-ui/react";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(7, "Senha deve conter no mínimo 7 caracteres"),
  password_confirmation: yup.string().oneOf(
    [
      null,
      yup.ref("password"), // ref() referencia outro campo que está sendo validado, para bater os dados
    ],
    "As senhas devem ser iguais"
  ),
});

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function userCreate() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema), // validações de formulários usando o schema criado a partir do yup
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1800));
  };

  return (
    <>
      <Head>
        <title>Novo usuário | dashgo</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            onSubmit={handleSubmit(handleCreateUser)}
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
          >
            <Heading size="lg" fontWeight="normal">
              Criar usuário
            </Heading>
            {/* componentizar */}
            <Divider my="6" borderColor="gray.700" />
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" w="100%" spacing={["6", "8"]}>
                <Input
                  name="name"
                  label="Nome Completo"
                  error={formState.errors.name}
                  {...register("name")}
                />

                <Input
                  name="email"
                  type="email"
                  label="E-mail"
                  error={formState.errors.email}
                  {...register("email")}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" w="100%" spacing={["6", "8"]}>
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  error={formState.errors.password}
                  {...register("password")}
                />

                <Input
                  name="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  error={formState.errors.password_confirmation}
                  {...register("password_confirmation")}
                />
              </SimpleGrid>
              {/* componentizar */}
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  isLoading={formState.isSubmitting}
                  colorScheme="pink"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
