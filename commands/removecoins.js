const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'removecoins',
    description: 'Remove coins from an user',
    options: [
      {
        name: 'id',
        description: 'User ID',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'amount',
        description: 'Amount of coins to remove',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const userId = interaction.options.getString('id').toString();
    const amount = interaction.options.getInteger('amount');

    try {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      if (!member.roles.cache.has(config.role_id)) {
        return interaction.reply('You do not have the required role to use this command.');
      }
      const response = await fetch(`${config.url}/api/coins/remove`, {
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
          .setTitle(`Coins Removed Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error removing coins');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
