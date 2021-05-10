import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'; // lidando com api fake
import faker from 'faker'; // lidando com dados fictícios

interface User {
  name: string,
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: { // gerando dados em massa
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(server) { // gerando dados fictícios para o início da requisição
      server.createList('user', 200) // gerando usuários com dados fictícios
    },
    routes() {
      this.namespace = 'api'; // nome da rota a ser chamada em cada requisição
      this.timing = 750; // 750ms de delay

      this.get('/users', function(schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams; // page = página a ser exibida, per_page = quantos registro exibir por página
        const total = schema.all('user').length; // total de registros
        const pageStart = (Number(page) - 1) * Number(per_page); // calculando a página de início
        const pageEnd = pageStart + Number(per_page); // calculando a última página

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd);

        return new Response( // retornando uma resposta ao front, com o total de dados a serem exibidos e trabalhados na paginação
          200,
          { 'x-total-count': String(total) },
          { users }, // listagem de usuários
        );
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = ''; // resetando a rota a ser chamada para nao prejudicar as rotas de api do Next
      this.passthrough();
    },
  });

  return server;
};