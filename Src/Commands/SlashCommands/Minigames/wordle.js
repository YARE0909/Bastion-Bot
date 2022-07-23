const { ApplicationCommandOptionType, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, CommandInteractionOptionResolver, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios')

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
    await interaction.deferReply()
    let ACTUAL_WORD;
    let alreadyExists = await client.db.get(`Word_${interaction.guild.id}`);
    if (!alreadyExists) {
      const fetchWord = await axios.get("https://random-word-api.herokuapp.com/word?length=5");
      const word = fetchWord.data[0];
      ACTUAL_WORD = word
      await client.db.set(`Word_${interaction.guild.id}`, word)
    } else {
      ACTUAL_WORD = alreadyExists
    }
    let guessedWord = interaction.options.getString('word').toLowerCase();
    if (guessedWord.length !== 5) return await interaction.editReply({
      embeds: [{
        description: "The word's length should be `5`",
        color: container.Config.color.invisible
      }]
    })
    console.log(ACTUAL_WORD)
    //let ACTUAL_WORD = "vague"
    let WordArray = ACTUAL_WORD.split('');
    let guessedArray = guessedWord.split('');
    let sendingArray = []
    guessedArray.map(x => {
      if (WordArray.includes(x) && (ACTUAL_WORD.indexOf(x) === guessedArray.indexOf(x))) sendingArray.push(`🟩`)
      else if (WordArray.includes(x)) sendingArray.push(`🟨`)
      else sendingArray.push(`⬛`)
    })
    let shouldDelete = []
    await Promise.all(
      sendingArray.map(async (x) => {
        if (x === '🟩') shouldDelete.push('k')
      })
    )
    if (shouldDelete.join('') === 'kkkkk') {
      await client.db.del(`Word_${interaction.guild.id}`)
      await interaction.channel.send({
        content: "**Word guessed!** Resetting the word..."
      })
    }
    await interaction.editReply({
      content: `${guessedArray.map(x => `-${x}  `).join(' ').toUpperCase()}\n${sendingArray.join(' ')}`
    })

  },
};
