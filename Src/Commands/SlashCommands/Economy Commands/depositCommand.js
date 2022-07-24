const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  
  // Define Command
  name: "deposit",
  description: "Deposit money into your savings",
  options: [
    {
        name: "amount",
        description: "Enter amount to depsot",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  cooldown: 0 ,
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   * @param {*} container
   */

  // Command Callback
  run: async (client, interaction, container) => {
    let amountEntered = interaction.options.getInteger("amount");
    let current_acc = await client.db.get(`Current_${interaction.member.id}`);
    let savings_acc = await client.db.get(`Savings_${interaction.member.id}`);
    let parsedCurrent = parseInt(current_acc);
    let parsedSavings = parseInt(savings_acc);

    if (amountEntered > parsedCurrent) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },

              title: "You do not have that much money to deposit",
              color: 0xff0019,
            },
          ],
          ephemeral: true,
        });
    } else if (amountEntered == 0) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },
              title: "Can not deposit nothing genius",
              description: "Enter a non zero amount to withdraw",
              color: 0xff0019,
            },
          ],
          ephemeral: true
        });
    }
    else {
        parsedSavings += amountEntered;
        parsedCurrent -= amountEntered;
        await client.db.set(`Current_${interaction.member.id}`, parsedCurrent);
        await client.db.set(`Savings_${interaction.member.id}`, parsedSavings);

        await interaction.reply({
            embeds: [
                    {
                      author: {
                        name: interaction.user.tag,
                        icon_url: interaction.user.avatarURL({ dynamic: true }),
                      },
                      title: "Deposit Successfull!",
                      description: `Deposited ${amountEntered}`,
                      color: 0xffffff,
                    },
                  ],
        })
    }
  },
}; 
