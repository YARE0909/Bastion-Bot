const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    name: 'remFriend',
    returnNoErrors: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {*} container 
     */
    run: async (client, interaction, container) => {
        const isOnCooldown = Boolean(await client.db.get(`remFriend_${interaction.member.id}_cd`))
        const ttl = await client.db.ttl(`remFriend_${interaction.member.id}_cd`)
        const CooldownEnds = Math.round((Date.now() + ttl * 1000) / 1000)
        if (isOnCooldown) return await interaction.reply({
            embeds: [{
                title: 'You are on a Cooldown!',
                description: `You are currently on a cooldown to remove friends from your channel.\nYour cooldown ends <t:${CooldownEnds}:R>`,
                color: container.Config.color.invisible
            }],
            ephemeral: true
        })
        const modal = new ModalBuilder()
        .setCustomId('REM_FRIEND')
        .setTitle('Remove Friend Forum')
        .addComponents(
            new ActionRowBuilder({
                components: [
                    new TextInputBuilder()
                    .setCustomId('REM_FRIEND_ID')
                    .setLabel('Friend\'s ID')
                    .setMaxLength(18)
                    .setMinLength(1)
                    .setPlaceholder('733622933343174728')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
                ]
            })
        )

        await interaction.showModal(modal)
    }
}