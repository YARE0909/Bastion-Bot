module.exports = {
    name : 'removePingRoles',
    returnNoErrors: true,
    run : async(client, interaction, container) => {
        await interaction.deferReply({ ephemeral: true })
        let roles = ['982138794117586944', '982139005527289856', '982139603404353546', '982144498014511124', '982144943726403604', '982175737903730778', '982175765510643722', '982175833382854726', '982175847727386714', '981879772726583376', '981879917803343933', '981880057276547123', '981938031621709864', '981938099472969728']
        let placeholder = [];
        await Promise.all(
            roles.map(async (x) => {
                let hasRole = await interaction.member._roles.includes(x)
                if (hasRole === true) {
                    placeholder.push(x)
                    await interaction.member.roles.remove(x)
                }
            })
        )
        await interaction.editReply({
            embeds: [
                {
                    title: 'Updated Roles!',
                    description: `**Successfully removed the following roles:**\n${placeholder.length === 0 ? 'None!' : placeholder.map(x => `➜ <@&${x}>`).join('\n')}`,
                    color: container.Config.color.blue
                }
            ]
        })
    }
}