module.exports = {
    name: "boost",
    run: async(client, interaction, container) => {
        await interaction.reply({
            embeds: [{
                color: container.Config.color.blue,
                fields: [{
                    name: "Single Booster",
                    value: ">>> • Ability to use slash commands (**guild wide**)\n• Ability to `Join to create VC`\n• Get **1x** Amari Multi guild wide\n• Claim **1x** Auto Reaction\n• Ability to attach files and use external emotes (**guild wide**)\n• Get access to <#941308848424222790> & <#941308874051428392>\n• Ability to use `?afk` of <@!155149108183695360>\n• Ability to use `bro snipe` & `bro editsnipe`\n• Access to premium colour roles\n• Reaction Permissions in giveaway channels\n• Get access to fun tags: `-bon`, `-worn`, `-fight`, `-nnute`, `-bonk`"
                },
                {
                    name: "Double Booster",
                    value: ">>> • All single booster perks\n• Ability to get a custom role!\n• Ability to create a private channel with +2 friends\n• Get access to <#940825417491828796>\n• Ability to view audit logs"
                }]
            }],
            ephemeral: true
        })
    }
}