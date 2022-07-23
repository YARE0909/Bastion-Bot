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
            },
          ],
          title: "User Profile",
          color: container.Config.color.cyan,
        },
      ],
    });
  },
}; 
