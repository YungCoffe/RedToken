require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

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
    
    // Aqui você chama a sua função/banco de dados pra buscar o token do cara
    const tokenDoUsuario = buscarTokenNoBanco(userId);

    // OPÇÃO 1: Resposta Efêmera no canal (RECOMENDADO)
    // Ninguém no servidor consegue ler essa mensagem, nem administradores.
    await interaction.reply({
      content: `🔒 **Seu Token Seguro:** \`${tokenDoUsuario}\`\n*Nunca compartilhe esta chave com ninguém.*`,
      ephemeral: true
    });

    // OPÇÃO 2: Enviar na DM do usuário (Caso prefira enviar por mensagem direta)
    /*
    try {
      await interaction.user.send(`🔒 **Seu Token:** \`${tokenDoUsuario}\``);
      await interaction.reply({
        content: 'Enviei seu token diretamente na sua DM!',
        ephemeral: true
      });
    } catch (err) {
      // Caso o usuário esteja com as DMs fechadas no servidor
      await interaction.reply({
        content: 'Não consegui te mandar DM! Abra as mensagens diretas nas configurações do servidor.',
        ephemeral: true
      });
    }
    */
  }
});

// Função exemplo de busca de token
function buscarTokenNoBanco(userId) {
  // Exemplo fictício - Conecte ao seu Supabase/PostgreSQL/MongoDB aqui
  return `TOKEN_${userId}_ABC123XYZ`;
}

client.login(process.env.DISCORD_TOKEN);
