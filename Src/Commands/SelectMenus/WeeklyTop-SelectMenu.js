module.exports = {
    name: "weekly_top",
    run: async (client, interaction, container) => {
        await interaction.reply({
            content: 'Weekly Top Member Perks - WIP',
            ephemeral: true
        })
    }
}