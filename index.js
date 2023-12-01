const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Collection } = require('discord.js');
const config = require('./config.json')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
  client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log('Started refreshing application (/) commands.');
  await client.application?.commands.set(commands);
  console.log('Successfully reloaded application (/) commands.');
  
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!client.commands.has(commandName)) return;

  try {
    const command = client.commands.get(commandName);
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('An error occurred while executing the command.');
  }
});

client.login(config.token);
