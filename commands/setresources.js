const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'setresources',
    description: 'Set resources for a user',
    options: [
      {
        name: 'user',
        description: 'User ID',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'ram',
        description: 'RAM amount',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'disk',
        description: 'Disk space',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'cpu',
        description: 'CPU limit',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'servers',
        description: 'Number of servers',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'backups',
        description: 'Number of backups',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'allocations',
        description: 'Number of allocations',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
      {
        name: 'databases',
        description: 'Number of databases',
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getString('user');
    const ram = interaction.options.getString('ram');
    const disk = interaction.options.getString('disk');
    const cpu = interaction.options.getString('cpu');
    const servers = interaction.options.getString('servers');
    const backups = interaction.options.getString('backups');
    const allocations = interaction.options.getString('allocations');
    const databases = interaction.options.getString('databases');

    try {
      const response = await fetch(`${config.url}/api/resources/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
        body: JSON.stringify({
          user,
          ram,
          disk,
          cpu,
          servers,
          backups,
          allocations,
          databases,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`Resources Set Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error setting resources');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
