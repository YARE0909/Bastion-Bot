const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    name: 'addFriend',
    returnNoErrors: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {*} container 
     */
    run: async (client, interaction, container) => {
        const isOnCooldown = Boolean(await client.db.get(`addFriend_${interaction.member.id}_cd`))
        const ttl = await client.db.ttl(`addFriend_${interaction.member.id}_cd`)
        const CooldownEnds = Math.round((Date.now() + ttl * 1000) / 1000)
        if (isOnCooldown) return await interaction.reply({
            embeds: [{
                title: 'You are on a Cooldown!',
                description: `You are currently on a cooldown to add friends to your channel.\nYour cooldown ends <t:${CooldownEnds}:R>`,
                color: container.Config.color.invisible
            }],
            ephemeral: true
        })
        const modal = new ModalBuilder()
        .setCustomId('ADD_FRIEND')
        .setTitle('Add Friend Forum')
        .addComponents(
            new ActionRowBuilder({
                components: [
                    new TextInputBuilder()
                    .setCustomId('ADD_FRIEND_ID')
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