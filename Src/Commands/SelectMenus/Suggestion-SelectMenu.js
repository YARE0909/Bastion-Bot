module.exports = {
    name: "suggest",
    run: async (client, interaction, container) => {
        await interaction.reply({
            embeds: [{
                title: "How to make a suggestion",
                description: "> If you think anything in our server is missing or you want to share any idea that could make our server become better, suggest it by running:\n\n`-suggest [suggestion]`",
                color: container.Config.color.blue  
            }],
            ephemeral: true
        })
    }
}