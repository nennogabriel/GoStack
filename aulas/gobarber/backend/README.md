# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve porder resetar sua senha.

**RNF**

- Utilizar Mailtrap para testar emails em ambiente dev.
- Utilizar Amazon SES para envios em produção.
- O envio de e-mails deve acontecer em segundo plano.

**RN**

- O Link enviado por email deve resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

# Atualização de Perfil

**RF**

- O usuário deve poder atualizar seu perfil.

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar seua senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar s nova senha;


# Painel do Prestador

**RF**

- O usuário deve poder listar os agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo Agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador devem ser armazenados em cache;
- As nitificações do prestador devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em tempo real utilizando SOcket.io

**RN**

- A Notificação deve ter um status de lida ou não-lida para que prestador esteja ciente.


# Agendamento de Serviços

**RF**

- o usuário deve poder listar todos os prestadores cadastrados;
- o usuário deve poder listar os dias disponiveis com ao menos 1 dia disponivel do prestador selecionado;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve duar exatamente 1 hora;
- Os agendamentos devem estar disponiveis entre as 8h às 18h ( primeiro as 8h e último com início as 17h)
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviço consigo.
