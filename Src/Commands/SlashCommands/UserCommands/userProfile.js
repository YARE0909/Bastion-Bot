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
    await interaction.reply({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.avatarURL({ dynamic: true }),
          },
          thumbnail: {
            url: interaction.user.avatarURL,
          },
          color: container.Config.color.invisible,
        },
      ],
    });
  },
}; 
