module.exports = {
    name: 'test',
    run: async (client, interaction, container) => {
        const originalInvoker = interaction.message.interaction.user.id;
        if (originalInvoker !== interaction.user.id) return await interaction.reply({
            content: 'This is not for you.',
            ephemeral: true
        })
        await interaction.reply({
            content: 'This WORKS!'
        })
    }
}