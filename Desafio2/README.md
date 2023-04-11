esse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.

### Regras da aplicação

#Requisitos Funcionais

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições - cookie
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
      _As refeições devem ser relacionadas a um usuário._
  - [x] Nome
  - [x] Descrição
  - [x] Data e Hora
  - [x] Está dentro ou não da dieta - trafficLight

#Regras de Negócio

- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [ ] Melhor sequência por dia de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

#Requisitos não funcionais

USER

- [x] CREATE (POST) um user
- [x] GET (GET) todos users (somente admin)
- [x] GET (GET) um user por ID (validando se o session_id bate com o que tá fazendo a requisição ou é admin)
- [x] DELETE (DELETE) um user por ID (validando se o session_id bate com o que tá fazendo a requisição ou é admin)
- [x] UPDATE (PUT) um user por ID
- [x] User: id, session_id, name, email, type[admin, user],created_at, updated_at

MEAL

- [x] CREATE (POST) uma meal (junto cria usermeal)
- [x] GET (GET) todos meals (somente admin)
- [x] GET (GET) todos meals (validando se o session_id bate com o que tá fazendo a requisição ou é admin)
- [x] GET (GET) uma meal por ID
- [x] DELETE (DELETE) uma meal por ID
- [x] UPDATE (PUT) uma meal por ID
- [x] UPDATE (PATCH) uma meal por ID - mealEaten
- [x] Meal: id, name, description, date, mealEaten, caloriesQtt, carbsQtt, proteinQtt, fatQtt, trafficLight[green, orange, red], created_at, updated_at

USERMEALS

- [x] CREATE (POST) uma userMeal (quando se cria uma meal)
- [x] GET (GET) todos userMeals (somente adm)
- [x] - user_id (table.foreign('user_id').references('id').inTable('users')),
    - meal_id (table.foreign('meal_id).references('id').inTables('meals'))
    - created_at

### Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

[Daily Diet](https://www.figma.com/community/file/1218573349379609244)

## Entrega

Após concluir o desafio, você deve enviar a URL do seu código no GitHub para a plataforma.
