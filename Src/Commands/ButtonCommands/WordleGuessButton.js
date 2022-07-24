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
    let attempts = await client.db.get(
      `Wordle_Attempt_${interaction.member.id}`
    );
    let parsedAttempts = parseInt(attempts);
    parsedAttempts += 1;


    const modal = new ModalBuilder()
      .setCustomId("wordleModal")
      .setTitle("Wordle | Guess a 5 letter word");

    const wordInput = new TextInputBuilder()
      .setCustomId("word-input")

      .setLabel(`Attempt ${parsedAttempts}`)

      .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(wordInput);

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  },
};
