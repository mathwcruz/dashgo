import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Button, Stack } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SigIn() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema), // validações de formulários usando o schema criado a partir do yup
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async(values) => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (!!formState.errors) {
      router.push("/dashboard");
    };
  };

  return (
    <>
      <Head>
        <title>Sign in | Dashgo</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth="360px"
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)} // envolver a function handleSubmit, do Ract Hook Form, por volta da minha função que irá tratar os dados
        >
          <Stack s="4">
            <Input 
              name="email" 
              type="email" 
              label="E-mail" 
              error={formState.errors.email}
              {...register('email')} 
            />

            <Input 
              name="password"
              type="password"
              label="Senha"
              error={formState.errors.password}
              {...register('password')} 
            />
          </Stack>

          <Button 
            type="submit" 
            mt="6" 
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
