const { InteractionType, ButtonStyle } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ModalSubmitInteraction} interaction
   * @param {*} container
   */
  run: async (interaction, client, container) => {
    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "wordleModal") {
        const userInput = interaction.fields.getTextInputValue("word-input");
        if (userInput.length != 5) {
          await interaction.reply({
            embeds: [
              {
                author: {
                  name: interaction.user.tag,
                  icon_url: interaction.user.avatarURL({ dynamic: true }),
                },
                title: "Please enter a 5 lettered word only",
                color: 0xff0019,
              },
            ],
            ephemeral: true,
          });
        } else {
          let attempts = await client.db.get(
            `Wordle_Attempt_${interaction.member.id}`
          );
          let parsedAttempts = parseInt(attempts);
          parsedAttempts += 1;

          await client.db.set(
            `Wordle_Attempt_${interaction.member.id}`,
            parsedAttempts
          );

          const word = interaction.fields.getTextInputValue("word-input");

          let embedEdi = interaction.message.embeds[0];

          if (parsedAttempts == 6) {
            await embedEdi["fields"].push({
              name: `Attempt ${parsedAttempts}`,
              value: word,
            });
            await embedEdi["fields"].push({
              name: "You have used all your attempts",
              value: "You lost",
            });
            interaction.message.components[0].components[0].data.style =
              ButtonStyle.Secondary;
            interaction.message.components[0].components[0].data.disabled = true;
            await client.db.set(`Wordle_Attempt_${interaction.member.id}`, 0);
            await interaction.update({
              embeds: [embedEdi],
              components: interaction.message.components,
            });
          } else {
            await embedEdi["fields"].push({
              name: `Attempt ${parsedAttempts}`,
              value: word,
            });

            await interaction.update({
              embeds: [embedEdi],
            });
          }
        }
      }
    }
  },
};