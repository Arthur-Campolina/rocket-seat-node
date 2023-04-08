esse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.

### Regras da aplicação

#Requisitos Funcionais

- [ ] Deve ser possível criar um usuário
- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
      _As refeições devem ser relacionadas a um usuário._
  - [ ] Nome
  - [ ] Descrição
  - [ ] Data e Hora
  - [ ] Está dentro ou não da dieta

#Regras de Negócio

- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [ ] Quantidade total de refeições registradas
  - [ ] Quantidade total de refeições dentro da dieta
  - [ ] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência por dia de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

#Requisitos não funcionais

USER

- [x] CREATE (POST) um user
- [x] GET (GET) todos users (somente admin)
- [x] GET (GET) um user por ID (validando se o session_id bate com o que tá fazendo a requisição ou é admin)
- [x] DELETE (DELETE) um user por ID (validando se o session_id bate com o que tá fazendo a requisição ou é admin)
- [ ] UPDATE (PUT) um user por ID
- [x] User: id, session_id, name, email, type[admin, user],created_at, updated_at

MEAL

- [ ] CREATE (POST) uma meal
- [ ] GET (GET) todos meals
- [ ] GET (GET) uma meal por ID
- [ ] DELETE (DELETE) uma meal por ID
- [ ] UPDATE (PUT) uma meal por ID
- [x] Meal: id, name, caloriesQtt, carbsQtt, proteinQtt, fatQtt, trafficLight[green, orange, red], created_at, updated_at

USERMEALS

- [ ] CREATE (POST) uma userMeal
- [ ] GET (GET) todos userMeals por userId
- [ ] GET (GET) userMeal unica por userId
- [ ] DELETE (DELETE) uma userMeal por ID
- [x] - user_id (table.foreign('user_id').references('id').inTable('users')),
    - meal_id (table.foreign('meal_id).references('id').inTables('meals'))
    - created_at

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

[Daily Diet](https://www.figma.com/community/file/1218573349379609244)

## Entrega

Após concluir o desafio, você deve enviar a URL do seu código no GitHub para a plataforma.
