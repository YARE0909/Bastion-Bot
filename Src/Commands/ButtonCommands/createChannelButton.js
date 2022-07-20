let { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
module.exports = {
    name: 'privChannel',
    returnNoErrors: true,
    /**
     * 
     * @param {import('discord.js').Client} client 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {*} container 
     * @returns 
     */
    run: async (client, interaction, container) => {
        const hasPrivateChannel = await client.db.lRange(`hasPrivateChannel`, 0, -1);
        if (hasPrivateChannel.includes(interaction.member.id)) return await interaction.reply({
            embeds: [{
                title: 'Private Channel Claimed!',
                description: 'You have already claimed your private channel.',
                color: container.Config.color.invisible
            }],
            ephemeral: true
        })
        const modal = new ModalBuilder()
        .setCustomId('PRIVATE_CHANNEL')
        .setTitle('Private Channel Forum')
        .addComponents(
            new ActionRowBuilder({
                components: [
                    new TextInputBuilder()
                    .setCustomId('PRIVATE_CHANNEL_NAME')
                    .setPlaceholder('My private channel')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
                    .setLabel('Channel Name')
                    .setMinLength(3)
                    .setMaxLength(100)
                ]
            })
        )

        return await interaction.showModal(modal)
    }
}