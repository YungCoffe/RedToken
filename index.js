require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// 1. Cria um servidor HTTP simples só para o Render não derrubar o Web Service
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot do Discord rodando com sucesso!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
});

// 2. Configuração normal do Bot do Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'token') {
    const userId = interaction.user.id;
    
    // Busca o token no banco
    const tokenDoUsuario = buscarTokenNoBanco(userId);

    // Resposta Efêmera (privada no chat)
    await interaction.reply({
      content: `🔒 **Seu Token Seguro:** \`${tokenDoUsuario}\`\n*Nunca compartilhe esta chave com ninguém.*`,
      ephemeral: true
    });
  }
});

function buscarTokenNoBanco(userId) {
  // Substitua pela sua lógica de banco de dados (Supabase, etc.)
  return `TOKEN_${userId}_ABC123XYZ`;
}

client.login(process.env.DISCORD_TOKEN);
