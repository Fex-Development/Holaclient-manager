const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'setcoins',
    description: 'Add coins to a user',
    options: [
      {
        name: 'id',
        description: 'User ID',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'amount',
        description: 'Amount of coins to add',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const userId = interaction.options.getString('id').toString();
    const amount = interaction.options.getInteger('amount');

    try {
      const response = await fetch(`${config.url}/api/coins/set`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
        body: JSON.stringify({
          coins: amount,
          user: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`Coins Set Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error setting coins');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
