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

        const word = interaction.fields.getTextInputValue("word-input");

        let embedEdi = interaction.message.embeds[0];
        let embedButtons = interaction.message.components[0] // yes stop with the ear rape omg 

        if (parsedAttempts == 6) {
            await embedEdi["fields"].push({ name: word, value: "Attempt 2" });
            await embedEdi["fields"].push({ name: "You have used all your attempts", value: "You lost" });
            embedButtons.components[0] = embedButtons.map(x => {
              x.components[0] = x.components
            })
            await client.db.set(`Wordle_Attempt_${interaction.member.id}`, 0);
            await interaction.update({
              embeds: [embedEdi],
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
