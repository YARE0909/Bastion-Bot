const { Colors } = require('../../../../Colors')
module.exports = {
	name: "test",
	description: "This is a test command.",
	/**
	 * 
	 * @param {import('discord.js').Client} client 
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
	 * @param {*} container 
	 */
	run: async(client, interaction, container) => {
		await interaction.reply({
            content: `Hey, ${interaction.member}`
        })
	}
}