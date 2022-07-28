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
  name: "requests-button",
  returnNoErrors: true,
  ownerOnly: false,
  ignoreBots: true,
  run: async (client, interaction, container) => {
    let userClanID = await client.db.get(`${interaction.member.id}_ClanID`);
    let parsedUserClanID = parseInt(userClanID);
    const clanLeader = await client.db.get(`Clan_${parsedUserClanID}_leader`);
    const parsedClanLeader = parseInt(clanLeader);
    if (interaction.message.interaction.user.id !== interaction.member.id) {
      return await interaction.reply({
        embeds: [
          {
            title: "Your not that guy pal",
            color: 0xff0019,
          },
        ],
        ephemeral: true,
      });
    } else if (interaction.member.id != parsedClanLeader) {
      return await interaction.reply({
        embeds: [
          {
            title: "Only clan leader can do this",
            color: 0xff0019,
          },
        ],
        ephemeral: true,
      });
    } else {
      let waitlist = await client.db.lRange(
        `Clan_${parsedUserClanID}_waitList`,
        0,
        -1
      );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("prev-page")
          .setEmoji("<:DoubleArrowLeft:921969025699954698>")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("accept-req")
          .setLabel("Accept")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("reject-req")
          .setLabel("Reject")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("next-page")
          .setEmoji("<:DoubleArrowRight:921969085875650561>")
          .setStyle(ButtonStyle.Primary)
      );

      let embedsNumber = [];

      for (let i = 0; i < waitlist.length; i++) {
        let embed = {
          title: "Pending Requests",
          fields: [
            {
              name: `${client.users.cache.get(waitlist[i]).username}#${
            client.users.cache.get(waitlist[i]).discriminator
          }`,
              value: "> Placeholder",
              inline: true,
            },
          ],
          color: 0xffffff,
          thumbnail: {
            url: `https://cdn.discordapp.com/avatars/${waitlist[i]}/${
              client.users.cache.get(waitlist[i]).avatar
            }.png?size=1024`,
          },
        };
        embedsNumber.push(embed);
        console.log(client.users.cache.get(waitlist[i]).avatar);
      }
      let currentIndex = 0;

      let msg = await interaction.update({
        embeds: [embedsNumber[currentIndex]],
        components: [row],
      });

      const collector = msg.createMessageComponentCollector({
        time: 60000,
      });

      collector.on("collect", async i => {
        if (i.isButton()) {
          if (i.customId == "prev-page") {
            currentIndex === 0
              ? (currentIndex = embedsNumber.length - 1)
              : (currentIndex -= 1);
            await i.update({
              embeds: [embedsNumber[currentIndex]],
              components: [row],
            });
            console.log("Prev");
          } else if (i.customId == "next-page") {
            currentIndex === embedsNumber.length - 1
              ? (currentIndex = 0)
              : (currentIndex += 1);
            await i.update({
                embeds: [embedsNumber[currentIndex]],
                components: [row],
              });
              console.log("Next");
          } else if (i.customId == "accept-req") {
            await client.db.set(`${waitlist[currentIndex]}_ClanID`, userClanID);
            await client.db.lRem(`Clan_${userClanID}_waitList`, 0,waitlist[currentIndex]);
            await client.db.lPush(`Clan_${userClanID}_members`, waitlist[currentIndex]);
            row.components[1].setDisabled(true);

            let acceptEmb = {
              title: "Request Accepted!",
              color: 0xffffff,
            };

            await i.update({
              embeds: [acceptEmb],
              components: []
            });

          } else if (i.customId == "reject-req") {
            await client.db.lRem(`Clan_${userClanID}_waitList`, 0,waitlist[currentIndex]);

            let rejectEmb = {
              title: "Request Accepted!",
              color: 0xffffff,
            };

            await i.update({
              embeds: [rejectEmb],
              components: [],
            });
          }
        }
      })


    }
  },
};
