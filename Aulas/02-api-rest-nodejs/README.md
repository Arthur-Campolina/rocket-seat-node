#Requisitos Funcionais

- [ ] O usuário deve poder criar uma transação
- [ ] O usuário deve poder obter um resumo da sua conta
- [ ] O usuário deve ter acesso ao histórico de transações
- [ ] O usuário deve ter acesso a uma transação específica

#Regras de Negócio

- [ ] As transações podem ser do tipo crédito e debito
  - crédito: soma ao valor total
  - débit: subtrai do valor total
- [ ] Deve ser possível identificarmos o usuário entre as requisições
- [ ] O usuário só pode ver suas próprias transações

#Requisitos não funcionais

- [x] CREATE (POST) uma transação
- [x] GET (GET) todas transações
- [x] GET (GET) uma transação por ID
- [x] DELETE (DELETE) uma transação por ID
- [ ] UPDATE (PUT) uma transação por ID
