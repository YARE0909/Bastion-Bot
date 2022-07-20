module.exports = {
    name: 'claimGiveaway',
    returnNoErrors: true,
    run: async (client, interaction, container) => {
        await interaction.deferReply({
            ephemeral: true
        })
        const messageURL = interaction.message.components[0].components[1].url
        const channelID = messageURL.split('/')[5]
        const messageID = messageURL.split('/')[6]
        let targetMessage = await client.channels.cache.get(channelID).messages.fetch(messageID)
        const prize = targetMessage.embeds[0].title
        const giveawayHost = targetMessage.embeds[0].description.split('Hosted by: ')[1].replace('<@', '').replace('>', '')
        
        let winnerIDs = await client.db.lRange(`giveawayWinners_${messageID}`, 0, -1)
        if (!winnerIDs.includes(interaction.user.id)) {
            return await interaction.editReply({
                content: `You're not a winner of this giveaway`,
                ephemeral: true
            })
        }
        

        let claimedPeople = await client.db.lRange(`giveaway_${messageID}`, 0, -1)
        if (claimedPeople.includes(interaction.user.id)) return await interaction.editReply({
            content: `You have already claimed this giveaway!`
        })
        await client.db.lPush(`giveaway_${messageID}`, interaction.user.id)
        let afterClaim = await client.db.lRange(`giveaway_${messageID}`, 0, -1)
        if (afterClaim.length === winnerIDs.length) {
            await client.db.del(`giveawayWinners_${messageID}`)
            await client.db.del(`giveaway_${messageID}`)
            await interaction.message.components[0].components[0].setDisabled();
            await interaction.message.edit({
                components: [interaction.message.components[0]]
            })
        }
        await interaction.editReply({
            content: 'You have successfully claimed this giveaway!',
            ephemeral: true
        })
        await interaction.message.reply({
            content: `${interaction.member} has claimed this giveaway!`
        })
    }
}