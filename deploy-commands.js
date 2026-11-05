require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('token')
    .setDescription('Receba seu token privado com segurança')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Registrando comando /token...');

    // Registra rápido no servidor de testes definido no .env
    // Se quiser registrar globalmente (pode levar até 1h pra atualizar no Discord),
    // use: Routes.applicationCommands(process.env.CLIENT_ID)
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Comando registrado com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comando:', error);
  }
})();
