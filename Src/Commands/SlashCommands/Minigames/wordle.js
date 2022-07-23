const { ApplicationCommandOptionType } = require('discord.js');


module.exports = {
  // Define Command
  name: "guess",
  description: "Guess the word based on the given hints",
  options: [
    {
      name: "word",
      description: "Enter your word",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  cooldown: 0,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    // const fetchWord = await axios.get("https://random-word-api.herokuapp.com/word");
    // const word = fetchWord.data[0];

    await interaction.reply({
      content:
        "⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜",
    });
  },
};
