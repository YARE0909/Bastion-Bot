const {
    InteractionType
} = require('discord.js')
module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ModalSubmitInteraction} interaction 
     * @param {*} container 
     */
    run: async (interaction, client, container) => {
        if (interaction.type === InteractionType.ModalSubmit) {
            // continue the code, THIS IS ONLY CALLED WHEN THE MODAL IS SUBMITTED!!
        }
    }
}