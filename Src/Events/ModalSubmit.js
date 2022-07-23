const { InteractionType } = require("discord.js");
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
        let attempts = await client.db.get(`Wordle_Attempt_${interaction.member.id}`);
        let parsedAttempts = parseInt(attempts);
        parsedAttempts += 1;
        await client.db.set(`Wordle_Attempt_${interaction.member.id}`, parsedAttempts);
        let AfterSetattempts = await client.db.get(`Wordle_Attempt_${interaction.member.id}`);

        const word = interaction.fields.getTextInputValue("word-input");

        let embedEdi = interaction.message.embeds[0];
        if (AfterSetattempts == 6) {
            embedEdi["fields"].push({ name: word, value: "Attempt 2" });
            embedEdi["fields"].push({ name: "You have used all your attempts", value: "You lost" });
            interaction.message.components[0].components[0].data.disabled = true
            await client.db.set(`Wordle_Attempt_${interaction.member.id}`, 0);
            await interaction.update({
              embeds: [embedEdi],
              components: interaction.message.components
            });
        }else {
            await embedEdi["fields"].push({ name: word, value: "Attempt 2" });
    
            await interaction.update({
              embeds: [embedEdi],
            });
        }
        


        

      }
    }
  },
};
