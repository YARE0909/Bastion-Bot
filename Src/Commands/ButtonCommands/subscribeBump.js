module.exports = {
    name: "subscribe-bump",
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').ButtonInteraction} interaction 
     * @param {*} container 
     */
    run: async (client, interaction, container) => {

        await interaction.deferReply({ ephemeral: true })
        const hasRole = await client.functions.hasRole(interaction, '982144498014511124')
        await client.functions.toggleRole(interaction, "982144498014511124")
        await interaction.editReply({
            embeds: [{
                author: { name: interaction.user.tag, icon_url: interaction.user.avatarURL()},
                title: 'Updated Roles',
                fields: [
                    {
                        name: hasRole ? 'Removed Roles' : 'Added Roles',
                        value: `<@&982144498014511124>`
                    }
                ],
                color: container.Config.color.blue
            }]
        })
    }
}