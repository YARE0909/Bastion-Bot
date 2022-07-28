const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  // Define Command
  name: "clan",
  description: "Get info on your clan",
  options: [
    {
      name: "info",
      description: "See your clan info",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "join",
      description: "See your clan info",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "id",
          description: "Enter the clan ID of the clan you want to join",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "create",
      description: "Create your own clan!",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Enter the name of you clan",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  cooldown: 0,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    if (interaction.options.getSubcommand() == "create") {
      let userClanID = await client.db.get(`${interaction.member.id}_ClanID`);
      if (userClanID) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },
              title: "You are already in a clan mate",
              color: 0xffffff,
            },
          ],
        });
      } else {
        let clanName = interaction.options.getString("name");
        let clanIDs = await client.db.get("ClanIDs");
        let parsedClanIDs = parseInt(clanIDs);
        parsedClanIDs += 1;
        await client.db.set("ClanIDs", parsedClanIDs);
        await client.db.set(`Clan_${parsedClanIDs}_name`, clanName);
        await client.db.set(`Clan_${parsedClanIDs}_level`, 1);
        await client.db.set(`Clan_${parsedClanIDs}_xp`, 0);
        await client.db.set(`Clan_${parsedClanIDs}_member_count`, 1);
        await client.db.set(`${interaction.member.id}_ClanID`, parsedClanIDs);

        await client.db.lPush(
          `Clan_${parsedClanIDs}_members`,
          interaction.member.id.toString()
        );

        let members = await client.db.lRange(
          `Clan_${parsedClanIDs}_members`,
          0,
          -1
        );
        console.log(members);

        let clanUserID = await client.db.get(`${interaction.member.id}_ClanID`);
        let parsedUserClanID = parseInt(clanUserID);
        let userClanName = await client.db.get(`Clan_${parsedUserClanID}_name`);

        let clanLevel = await client.db.get(`Clan_${parsedUserClanID}_level`);
        let clanXP = await client.db.get(`Clan_${parsedUserClanID}_xp`);
        let clanMemberCount = await client.db.get(
          `Clan_${parsedUserClanID}_member_count`
        );

        let embed = [
          {
            author: {
              name: interaction.user.tag,
              icon_url: interaction.user.avatarURL({ dynamic: true }),
            },
            fields: [
              {
                name: `Clan Level ${clanLevel}`,
                value: `${clanXP}/${clanLevel * 2000}`,
                inline: true,
              },
              {
                name: `Member Count`,
                value: `Current Members: ${clanMemberCount}`,
                inline: true,
              },
            ],
            title: userClanName,
            color: 0xffffff,
            footer: {
              text: `Clan ID: ${parsedUserClanID}`,
            },
          },
        ];

        for (let i = 0; i < members.length; i++) {
          embed[0]["fields"].push({
            name: "Member",
            value: `<@${members[i]}>`,
          });
        }

        await interaction.reply({
          embeds: embed,
        });
      }
    }
    if (interaction.options.getSubcommand() == "info") {
      let userClanID = await client.db.get(`${interaction.member.id}_ClanID`);
      
      if (!userClanID) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },
              title: "You dont have a clan mate",
              color: 0xffffff,
            },
          ],
        });
      } else {
        let parsedUserClanID = parseInt(userClanID);
        let clanName = await client.db.get(`Clan_${parsedUserClanID}_name`);
        let clanLevel = await client.db.get(`Clan_${parsedUserClanID}_level`);
        let clanXP = await client.db.get(`Clan_${parsedUserClanID}_xp`);
        let clanMemberCount = await client.db.get(
          `Clan_${parsedUserClanID}_member_count`
        );

        let members = await client.db.lRange(
          `Clan_${parsedUserClanID}_members`,
          0,
          -1
        );
        console.log(members);

        let embed = [
          {
            author: {
              name: interaction.user.tag,
              icon_url: interaction.user.avatarURL({ dynamic: true }),
            },
            fields: [
              {
                name: `Clan Level ${clanLevel}`,
                value: `${clanXP}/${clanLevel * 2000}`,
                inline: true,
              },
              {
                name: `Member Count`,
                value: `Current Members: ${clanMemberCount}`,
                inline: true,
              },
            ],
            title: clanName,
            color: 0xffffff,
            footer: {
              text: `Clan ID: ${parsedUserClanID}`,
            },
          },
        ];

          embed[0]["fields"].push({
            name: "Member",
            value: members.map(x => `<@${x}>`).join('\n'),
            inline: false,
          });

        await interaction.reply({
          embeds: embed,
        });
      }
    }
    if (interaction.options.getSubcommand() == "join") {
      let userInput = interaction.options.getInteger("id");
      let clanID = await client.db.get(`Clan_${userInput}_name`);

      if (!clanID) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },
              title: "The clan you want to join does not exist",
              description: "Check your clan ID",
              color: 0xffffff,
            },
          ],
        });
      } else {
        let userClanID = await client.db.get(`${interaction.member.id}_ClanID`);
        if (userClanID) {
          await interaction.reply({
            embeds: [
              {
                author: {
                  name: interaction.user.tag,
                  icon_url: interaction.user.avatarURL({ dynamic: true }),
                },
                title: "You are already in a clan mate",
                color: 0xffffff,
              },
            ],
          });
        } else {
          
          await client.db.lPush(`Clan_${userInput}_waitList`, interaction.member.id.toString());
          let waitlist = await client.db.lRange(`Clan_${userInput}_waitList`, 0, -1);
          console.log(waitlist);
         
          await interaction.reply({
            embeds: [
              {
                author: {
                  name: interaction.user.tag,
                  icon_url: interaction.user.avatarURL({ dynamic: true }),
                },
                title: `Successfully sent a request to join ${clanID}`,
                description: "You will be notified if you are accepted or rejected from the clan",
                color: 0xffffff,
              },
            ],
          });
        }
      }
    }
  },
};
