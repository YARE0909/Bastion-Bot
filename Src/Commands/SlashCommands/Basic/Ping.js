const { Colors } = require('../../../../Colors')
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
		const WithoutHast = Colors.map(x => x.replace('#', ''))
		const randomColor = WithoutHast[Math.floor(Math.random() * WithoutHast.length)]
		const ping = new container.Discord.EmbedBuilder()
		.setColor(randomColor)
		.setTimestamp()
		.setTitle('🏓╎ Pong!')
		.setDescription(`🏠╎Websocket Latency: ${client.ws.ping}ms\n🤖╎Bot Latency: ${Date.now() - interaction.createdTimestamp}ms`);
		await interaction.reply({ embeds: [ping] })
	}
}