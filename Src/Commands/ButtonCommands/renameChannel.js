let { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    name: 'renameChannel',
    returnNoErrors: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {*} container 
     */
    run: async (client, interaction, container) => {
        const isOnCD = Boolean(await client.db.get(`renameChannel_${interaction.member.id}_cd`))
        const ttl = await client.db.ttl(`renameChannel_${interaction.member.id}_cd`)
        const CooldownTill = Math.round((Date.now() + (ttl * 1000)) / 1000)
        if (isOnCD) return await interaction.reply({
            embeds: [{
                title: 'You are on a Cooldown!',
                description: `You are currently on a cooldown for renaming the channel.\nYour cooldown ends <t:${CooldownTill}:R>`,
                color: container.Config.color.invisible
            }],
            ephemeral: true
        })
        const modal = new ModalBuilder()
        .setTitle("Rename Channel Forum")
        .setCustomId('RENAME_CHANNEL')
        .addComponents(
            new ActionRowBuilder({
                components: [
                    new TextInputBuilder()
                    .setCustomId('RENAME_CHAN_NAME')
                    .setLabel('Channel name')
                    .setMaxLength(100)
                    .setMinLength(3)
                    .setPlaceholder('My new Channel Name')
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
                ]
            })
        )

        return await interaction.showModal(modal)
    }
}