const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'revokecoupon',
    description: 'Revoke a coupon',
    options: [
      {
        name: 'code',
        description: 'Coupon code to revoke',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const code = interaction.options.getString('code');

    try {
      const response = await fetch(`${config.url}/api/coupons/revoke/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`Coupon Revoked Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error revoking coupon');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
