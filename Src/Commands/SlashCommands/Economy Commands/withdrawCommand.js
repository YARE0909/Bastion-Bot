const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  // Define Command
  name: "withdraw",
  description: "Withdraw money from your savings account",
  options: [
    {
        name: "amount",
        description: "Enter the amount to withdraw",
        type: ApplicationCommandOptionType.Integer,
        required: true,
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
    let amountEntered = interaction.options.getInteger("amount");
    let current_acc = await client.db.get(`Current_${interaction.member.id}`);
    let savings_acc = await client.db.get(`Savings_${interaction.member.id}`);
    let parsedCurrent = parseInt(current_acc);
    let parsedSavings = parseInt(savings_acc);

    if (amountEntered > parsedSavings) {
        await interaction.reply({
          embeds: [
            {
              author: {
                name: interaction.user.tag,
                icon_url: interaction.user.avatarURL({ dynamic: true }),
              },

              title: "You do not have that much money to withdraw",
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
              title: "Can not withdraw nothing genius",
              description: "Enter a non zero amount to withdraw",
              color: 0xff0019,
            },
          ],
          ephemeral: true
        });
    }
    else {
        parsedSavings -= amountEntered;
        parsedCurrent += amountEntered;
        await client.db.set(`Current_${interaction.member.id}`, parsedCurrent);
        await client.db.set(`Savings_${interaction.member.id}`, parsedSavings);

        await interaction.reply({
            embeds: [
                    {
                      author: {
                        name: interaction.user.tag,
                        icon_url: interaction.user.avatarURL({ dynamic: true }),
                      },
                      title: "Withdrawal Successfull!",
                      description: `Withdrawed ${amountEntered}`,
                      color: 0xffffff,
                    },
                  ],
        })
    }
    
  },
}; 
