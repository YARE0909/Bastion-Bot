module.exports = {
  
  // Define Command
  name: "clan",
  description: "Get info on your clan",
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
    const clanName = await client.db.get(`Clan_${interaction.member.id}`);
    await interaction.reply({
        embeds: [
                {
                  author: {
                    name: interaction.user.tag,
                    icon_url: interaction.user.avatarURL({ dynamic: true }),
                  },
                  title: `${clanName}`,
                  color: 0xffffff,
                },
              ],
    })
  },
}; 
