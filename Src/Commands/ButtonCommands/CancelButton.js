const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "cancel",
  returnNoErrors: true,
  ownerOnly: false,
  ignoreBots: true,
  run: async (client, interaction, container) => {
    await interaction.update({
        embeds: [
                {
                  author: {
                    name: interaction.user.tag,
                    icon_url: interaction.user.avatarURL({ dynamic: true }),
                  },
                  title: "Action Cancelled",
                  color: 0xffffff,
                },
              ],
        components: []
    })
  },
};