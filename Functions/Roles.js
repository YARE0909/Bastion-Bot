let Discord = require('discord.js')
/**
 * 
 * @param {Discord.CommandInteraction} interaction 
 * @param {string} roleID 
 */
async function toggleRole(interaction, roleID) {
    if (interaction.member.roles.cache.has(roleID)) {
        return await interaction.member.roles.remove(roleID)
    } else return await interaction.member.roles.add(roleID)
}

async function hasRole(interaction, roleID) {
    if (interaction.member.roles.cache.has(roleID)) return true
    else return false
}

module.exports = {
    toggleRole,
    hasRole
}