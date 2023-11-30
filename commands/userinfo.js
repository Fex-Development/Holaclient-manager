const { MessageEmbed, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

module.exports = {
  data: {
    name: 'userinfo',
    description: 'Get user information',
    options: [
      {
        name: 'id',
        description: 'User ID',
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const userId = interaction.options.getInteger('id');

    try {
      const response = await fetch(`${config.url}/api/userinfo/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': config.api,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle(`${data.userinfo.name}'s User Information`)
          .setImage('https://media.discordapp.net/attachments/838372326071861334/1179664003329437696/104668118.png');

        const fields = [
          {
            name: 'User ID',
            value: data.userinfo.hcid.toString(),
            inline: false,
          },
          {
            name: 'Username',
            value: data.userinfo.username,
            inline: true,
          },
          {
            name: 'Email',
            value: data.userinfo.email,
            inline: true,
          },
          {
            name: 'Coins',
            value: data.coins.toString(),
            inline: true,
          },
        ];
        embed.addFields(...fields);

        let sumr = data.package.ram + data.extra.ram;
        let sumd = data.package.disk + data.extra.disk;
        let sumc = data.package.cpu + data.extra.cpu;
        let sums = data.package.servers + data.extra.servers;
        let sumdb = data.package.database + data.extra.database;
        let sumb = data.package.backups + data.extra.backups;
        let suma = data.package.allocations + data.extra.allocations;

        embed.addFields(
          { name: 'Package', value: data.package.name, inline: false },
          { name: 'RAM', value: `${sumr} MB`, inline: true },
          { name: 'Disk', value: `${sumd} MB`, inline: true },
          { name: 'CPU', value: `${sumc}%`, inline: true },
          { name: 'Servers', value: `${sums}`, inline: true },
          { name: 'Databases', value: `${sumdb}`, inline: true },
          { name: 'Backups', value: data.package.backups.toString(), inline: true },
          { name: 'Allocations', value: data.package.allocations.toString(), inline: true },
        );
        embed.setFooter({ text: 'Bot made by Fex Development and Demon142' });
        interaction.reply({ embeds: [embed] });
      } else {
        interaction.reply('Error fetching user info');
      }
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
