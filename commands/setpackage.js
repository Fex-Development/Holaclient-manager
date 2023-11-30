const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'setpackage',
    description: 'Set package for a user',
    options: [
      {
        name: 'user',
        description: 'User ID',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'package',
        description: 'Package name',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getString('user');
    const packageName = interaction.options.getString('package');

    try {
      const response = await fetch(`${config.url}/api/package/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
        body: JSON.stringify({
          user,
          package: packageName,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`Package Set Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error setting package');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
