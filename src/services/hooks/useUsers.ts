import { useQuery } from "react-query";
import { api } from "../api";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface GetUserResponse {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUserResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map((user) => {
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      createdAt: new Date(user?.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users, 
    totalCount,
  };
};

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), { // primeiro parametro é nome da chave que será armazenada no cache
    staleTime: 1000 * 60 * 10, // => 10 minutos. Durante esse tempo, não é necessário recarregar os dados
  });
};

/*
Integração do React Query com SSR:
export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(["users", page], () => getUsers(page), { // primeiro parametro é nome da chave que será armazenada no cache
    staleTime: 1000 * 60 * 10, // => 10 minutos. Durante esse tempo, não é necessário recarregar os dados
    ...options,
  });
};
*/