const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'botinfo',
    description: 'Get information about the bot',
  },
  async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    const wsPing = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor('#3498db')
      .setTitle('HolaClient Manager Bot Info')
      .setImage('https://media.discordapp.net/attachments/838372326071861334/1179664003329437696/104668118.png')
      const fields = [
      {
        name: 'Author',
        value: 'Demon142',
        inline: true,
      },
      {
        name: 'GitHub',
        value: '[GitHub Repository](https://github.com/fex-development)',
        inline: true,
      },
      {
        name: 'Bot Name',
        value: 'HolaClient Manager',
        inline: true,
      },
      {
        name: 'Ping',
        value: `${ping}ms`,
        inline: true,
      },
      {
        name: 'WS Ping',
        value: `${wsPing}ms`,
        inline: true,
      },
    ];
    embed.addFields(...fields);
    embed.setFooter({ text: 'Bot made by Fex Development and Demon142' });

    interaction.reply({ embeds: [embed] });
  },
};
