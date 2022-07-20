let { SelectMenuInteraction } = require('discord.js')
/**
 * 
 * @param {SelectMenuInteraction} interaction 
 * @param {string[]} values 
 */
async function dankPingRoles(interaction, values) {
    let userRoles = await interaction.member._roles;
    let roles = ['981879772726583376', '981879917803343933', '981880057276547123', '981938031621709864', '981938099472969728']
    
}


module.exports = {
    dankPingRoles
}