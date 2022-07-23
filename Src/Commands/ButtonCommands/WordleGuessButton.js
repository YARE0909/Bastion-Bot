const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
} = require("discord.js");

module.exports = {
  name: "guess-wordle",
  returnNoErrors: true,
  ownerOnly: true,
  run: async (client, interaction, container) => {
    


    const modal = new ModalBuilder()
      .setCustomId("wordleModal")
      .setTitle("Wordle");

    const wordInput = new TextInputBuilder()
      .setCustomId("word-input")
      // The label is the prompt the user sees for this input
      .setLabel("Guess a 5 letter word")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(wordInput);

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  },
};
