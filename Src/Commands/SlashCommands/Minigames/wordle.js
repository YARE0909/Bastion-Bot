const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
  // Define Command
  name: "wordle",
  description: "Guess the word!",
  // cooldown: 86400000,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("guess-wordle")
        .setLabel("Guess!")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.avatarURL({ dynamic: true }),
          },
          fields: [
            {
              name: "You have 6 attempts to guess the word",
              value: "GO!",
            },
          ],
          title: "Wordle",
          color: 0x0400ff,
        },
      ],
      components: [row],
    });
  },
};
