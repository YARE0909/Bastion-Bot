const { InteractionType } = require("discord.js");
module.exports = {

    name: "interactionCreate",
    /**
     * 
     * @param {import('discord.js').CommandInteraction} interaction 
     * @param {import('discord.js').Client} client 
     */
    run: async(interaction, client) => {
        if (!interaction.isButton()) return;
        else{
            if (interaction.customId.includes("clanLeaderApproval_")) {
                let userClanID = await client.db.get(
                  `${interaction.member.id}_ClanID`
                );
                let parsedUserClanID = parseInt(userClanID);
                let waitlist = await client.db.lRange(
                  `Clan_${parsedUserClanID}_waitList`,
                  0,
                  -1
                );
                let embed = [
                        {
                          author: {
                            name: interaction.user.tag,
                            icon_url: interaction.user.avatarURL({ dynamic: true }),
                          },
                          fields: [
                            {
                              name: "",
                              value: "",
                            },
                          ],
                          title: "Pending Request",
                          color: 0xffffff,
                        },
                      ]
                await interaction.reply({
                    content: "Success"
                })
            }
          }
        }
          
    
}