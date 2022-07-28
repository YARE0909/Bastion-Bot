const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "confirm-leave",
  returnNoErrors: true,
  ownerOnly: false,
  ignoreBots: true,
  run: async (client, interaction, container) => {
    let userClanID = await client.db.get(`${interaction.member.id}_ClanID`);
    let parsedUserClanID = parseInt(userClanID);
    let clanName = await client.db.get(`Clan_${parsedUserClanID}_name`);
    await client.db.lRem(`Clan_${userClanID}_members`, 0, interaction.member.id);


    await interaction.update({
        embeds: [
                {
                  author: {
                    name: interaction.user.tag,
                    icon_url: interaction.user.avatarURL({ dynamic: true }),
                  },
                  title: `Left ${clanName}`,
                  color: 0xffffff,
                },
              ],
        components: []
    })


    await client.db.del(`${interaction.member.id}_ClanID`);
  },
};