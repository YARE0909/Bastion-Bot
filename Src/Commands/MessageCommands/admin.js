let Discord = require('discord.js')
const wait = require('node:timers/promises').setTimeout
let { faqOptions, dankPingRolesOptions, ageRolesOptions, genderRolesOptions, serverRolesOptions, minigameRolesOptions } = require('../../../Constants/Panel-option-values')
module.exports = {
    name: "panel",
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {} container 
     */
    run: async(client, message, args, container) => {
        const row = new container.Discord.ActionRowBuilder().addComponents(
            new container.Discord.SelectMenuBuilder()
					.setCustomId('faq')
					.setPlaceholder('Select your FAQ!')
					.addOptions(faqOptions)
                    )
        

        const DankRolesRow = new container.Discord
        .ActionRowBuilder()
        .addComponents(
            new container.Discord
            .SelectMenuBuilder()
            .setCustomId('dankRoles')
            .setPlaceholder('Select your Dank Ping Roles!')
            .setMinValues(0)
            .setMaxValues(5)
            .addOptions(dankPingRolesOptions)
        )

        const ageRolesRow = new container.Discord.ActionRowBuilder().addComponents(
            new container.Discord.SelectMenuBuilder()
            .setCustomId('ageRoles')
            .setMinValues(0)
            .setMaxValues(1)
            .setPlaceholder('Select your Age Roles!')
            .addOptions(ageRolesOptions)
        )

        const genderRolesRow = new container.Discord.ActionRowBuilder().addComponents(
            new container.Discord.SelectMenuBuilder()
            .setCustomId('genderRoles')
            .setMinValues(0)
            .setMaxValues(1)
            .setPlaceholder('Select your Gender Roles!')
            .addOptions(genderRolesOptions)
        )

        const serverRolesRow = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId('serverRoles')
            .setPlaceholder('Select your Server Roles!')
            .setMinValues(0)
            .setMaxValues(5)
            .addOptions(serverRolesOptions)
        )

        const minigameRolesRow = new container.Discord.ActionRowBuilder().addComponents(
            new container.Discord.SelectMenuBuilder()
            .setCustomId('minigames')
            .setPlaceholder('Select your Minigame Roles!')
            .setMinValues(0)
            .setMaxValues(4)
            .addOptions(minigameRolesOptions)
        )

        const removeRoles = new container.Discord.ActionRowBuilder().addComponents(
            new container.Discord.ButtonBuilder()
            .setCustomId('removePingRoles')
            .setLabel('Remove Ping Roles')
            .setStyle(Discord.ButtonStyle.Danger)
        )

        if (!args[0]) return await message.reply("Provide args")
        await message.delete()   
        switch (args[0]) {
            case "faq":
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Frequently Asked Questions',
                            description: '<a:BlueArrow:948476616999333968> Please select the option corresponding to your question',
                            fields: [
                                {
                                    name: 'Additional Notes',
                                    value: `<a:YellowArrow:939772757980364840> Booster's will have a random check once every **5** days to check if they are still boosting the server\n<a:YellowArrow:939772757980364840> Weekly Winner Perks last for **7** days\n<a:YellowArrow:939772757980364840> Please do not troll suggest. Any sort of troll suggestion leads to warnings & mutes\n<a:YellowArrow:939772757980364840> Booster and Investor Perks lasts as long as you keep boosting or investing.`
                                }
                            ],
                            color: container.Config.color.blue
                        }
                    ],
                    components: [row]
                })
                break;
            case "roles":
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Age Roles',
                            description: '*Select the age role that you want from the below drop down menu!*',
                            color: container.Config.color.blue
                        }
                    ],
                    components: [ageRolesRow]
                })
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Gender Roles',
                            description: '*Select the gender role that you want from the below drop down menu!*',
                            color: container.Config.color.blue
                        }
                    ],
                    components: [genderRolesRow]
                })
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Server Roles',
                            description: '*Select the server roles that you want from the below drop down menu!*',
                            color: container.Config.color.blue
                        }
                    ],
                    components: [serverRolesRow]
                })
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Minigame Roles',
                            description: '*Select the minigame roles that you want from the below drop down menu!*',
                            color: container.Config.color.blue
                        }
                    ],
                    components: [minigameRolesRow]
                })
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Dank Ping Roles',
                            description: '*Select the roles that you want from the below drop down menu!*',
                            color: container.Config.color.blue
                        }
                    ],
                    components: [DankRolesRow]
                })
                await wait(3000)
                await message.channel.send({
                    embeds: [
                        {
                            title: 'Remove all Ping Roles',
                            description: '*Click the below button to remove all ping roles!*',
                            color: container.Config.color.invisible
                        }
                    ],
                    components: [removeRoles]
                })
                break;
            case "channel":
                await message.channel.send({
                    embeds: [{
                        title: 'Claim your channel!',
                        description: '*Click the below button to create your own private channel!*',
                        color: container.Config.color.invisible
                    }],
                    components: [new Discord.ActionRowBuilder({
                        components: [new Discord.ButtonBuilder({
                            label: 'Create Channel',
                            style: 'PRIMARY',
                            custom_id: 'privChannel'
                        })]
                    })]
                })
                break;
            default:
                await message.channel.send('Not a valid arg')
        }
                }
            }