const { default: axios } = require("axios");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { InteractionType } = require("discord.js");

module.exports = {
  // Define Command
  name: "guess",
  description: "Guess the word based on the given hints",
  options: [],
  cooldown: 0,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    const fetchWord = await axios.get("https://random-word-api.herokuapp.com/word");
    const word = fetchWord.data[0];
    
    await interaction.reply({
      content:
        "⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜\n⬜⬜⬜⬜⬜",
    });
  },
};
