module.exports = {
  
  // Define Command
  name: "profile",
  description: "Check out your profile info!",
  options: [],
  cooldown: 0 ,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    let networth = await client.db.get(`Networth_${interaction.member.id}`);
    let userLevel = await client.db.get(`Level_${interaction.member.id}`);
    let userXP = await client.db.get(`XP_${interaction.member.id}`);
    await interaction.reply({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.avatarURL({ dynamic: true }),
          },
          fields: [
            {
              name: "Networth",
              value: `¤ ${parseInt(networth).toLocaleString("en-US")}`,
              inline: true
            },
            {
              name: `Level ${userLevel}`,
              value: `XP ${parseInt(userXP).toLocaleString("en-US")}/${userLevel*1000}`,
              inline: true
            },
          ],
          title: "User Profile",
          color: container.Config.color.cyan,
        },
      ],
    });
  },
}; 
