module.exports = {
    name: "balance",
    description: 'Check the balance of a user.',
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @param {*} container 
     */
   run: async (client, interaction, container) => {
    let savings = await client.db.get(`Savings_${interaction.member.id}`);
    let current = await client.db.get(`Current_${interaction.member.id}`);
    await interaction.reply({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.avatarURL({ dynamic: true }),
          },
          fields: [
            {
              name: "Current Account",
              value: `¤ ${parseInt(current).toLocaleString("en-US")}`,
            },
            {
              name: "Savings Account",
              value: `¤ ${parseInt(savings).toLocaleString("en-US")}`,
            },
          ],
          thumbnail: {
            url: "https://cdn.discordapp.com/attachments/942349824047583262/998547822204964884/unknown.png",
          },
          color: container.Config.color.invisible,
        },
      ],
    });
   }
}