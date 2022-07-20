const { Colors } = require('discord.js')
module.exports = {
	name: "ping",
	description: "Run this to see my ping.",
	/**
	 * 
	 * @param {import('discord.js').Client} client 
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
	 * @param {*} container 
	 */
	run: async(client, interaction, container) => {
		const ping = new container.Discord.EmbedBuilder()
		.setColor(Colors.Blurple)
		.setTimestamp()
		.setTitle('🏓╎ Pong!')
		.setDescription(`🏠╎Websocket Latency: ${client.ws.ping}ms\n🤖╎Bot Latency: ${Date.now() - interaction.createdTimestamp}ms`);
		await interaction.reply({ embeds: [ping] })
	}
}