module.exports = {
    name: "balance",
    description: 'Check the balance of a user.',
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @param {*} container 
     */
   run: async (client, interaction, container) => {
    let UserBalance = await client.db.get(`Balance_${interaction.member.id}`)
    if (!UserBalance) await client.db.set(`Balance_${interaction.member.id}`, "5000"); // yes yes
    let verifiedBalance = await client.db.get(`Balance_${interaction.member.id}`)
    await interaction.reply({
        embeds: [{
            author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true })
            },
            fields: [{
                name: 'Wallet',
                value: verifiedBalance
            }],
            thumbnail: { url: "https://cdn.discordapp.com/attachments/942349824047583262/998547822204964884/unknown.png" },
            color: container.Config.color.invisible
        }]
        
    })
   }
}