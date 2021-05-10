import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "react-query"

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { UserHeader } from "../../components/UserHeader";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

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

export default function userCreate() {
  const createUser = useMutation(async(user: CreateUserFormData) => {
    const response = await api.post("users", {
      user: {
        ...user,
        created_at: new Date(),
      },
    });

    return response.data.user;
  }, {
    onSuccess: () => { // limpando os dados do cache caso o post dos dados dê sucesso
      queryClient.invalidateQueries("users");
    },
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema), // validações de formulários usando o schema criado a partir do yup
  });
  const router = useRouter();

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values); // fazendo um post no banco de usuários

    router.push("/users");
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
            <UserHeader title="Criar usuário" />

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
                  colorScheme="pink"
                  isLoading={formState.isSubmitting}
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
