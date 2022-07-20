module.exports = {
    name : 'evalbtn',
    returnNoErrors: true,
    ownerOnly: true,
    run : async(client, interaction, container) => {
        await interaction.message.delete()
    }
}