const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'createcoupon',
    description: 'Create a coupon',
    options: [
      {
        name: 'code',
        description: 'Coupon code',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'coins',
        description: 'Number of coins for the coupon',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
      {
        name: 'uses',
        description: 'Number of times this coupon can be claimed',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
      {
        name: 'ram',
        description: 'Amount of RAM for the coupon (in MB)',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'disk',
        description: 'Disk space for the coupon (in MB)',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'cpu',
        description: 'CPU limit for the coupon (percentage)',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'servers',
        description: 'Number of servers for the coupon',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'backups',
        description: 'Number of backups for the coupon',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'allocations',
        description: 'Number of allocations for the coupon',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
      {
        name: 'databases',
        description: 'Number of databases for the coupon',
        type: ApplicationCommandOptionType.Integer,
        required: false,
      },
    ],
  },
  async execute(interaction) {
    const code = interaction.options.getString('code');
    const coins = interaction.options.getInteger('coins');
    const ram = interaction.options.getInteger('ram');
    const disk = interaction.options.getInteger('disk');
    const cpu = interaction.options.getInteger('cpu');
    const servers = interaction.options.getInteger('servers');
    const backups = interaction.options.getInteger('backups');
    const allocations = interaction.options.getInteger('allocations');
    const databases = interaction.options.getInteger('databases');
    const uses = interaction.options.getInteger('uses');

    try {
      const response = await fetch(`${config.url}/api/coupons/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
        body: JSON.stringify({
          code,
          coins,
          ram,
          disk,
          cpu,
          servers,
          backups,
          allocations,
          databases,
          uses,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`Coupon Created Successfully`)
          .setFooter({ text: 'Bot made by Fex Development and Demon142' });

        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error creating coupon');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
