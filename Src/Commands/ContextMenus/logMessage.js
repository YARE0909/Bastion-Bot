const { ApplicationCommandType } = require('discord.js')
module.exports = {
    name: "log",
    type: ApplicationCommandType.Message,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ContextMenuCommandInteraction} interaction 
     * @param {*} container 
     */
    run: async(client, interaction, container) => {
        console.log(interaction.channel.messages.cache.get(interaction.targetId) ?? await interaction.channel.messages.fetch(interaction.targetId))
        await interaction.reply({
            content: 'Check console.'
        })
    }
}