const { InteractionType } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   * @param {import('discord.js').Client} client
   */
  run: async (interaction, client) => {
    // (await client.application.commands.fetch()).find(cmd => cmd.name == 'commandName').delete() // code to delete slash command
    // await client.guilds.cache.get('940601638610153483').commands.delete('950027104802734190') -> 950027104802734190 is commandId // Use this in case the above code doesn't work
    const loadCommandOptions = require("../Structures/CommandOptions/loadCommandOptions");
    if (interaction.isButton())
      loadCommandOptions(
        client,
        interaction,
        client.commands.buttonCommands.get(interaction.customId),
        true,
        "Button"
      );
    else if (interaction.isSelectMenu())
      loadCommandOptions(
        client,
        interaction,
        client.commands.selectMenus.get(
          interaction.values[0] ?? interaction.customId
        ),
        true,
        "SelectMenus"
      );
    else if (interaction.isMessageContextMenuCommand())
      loadCommandOptions(
        client,
        interaction,
        client.commands.contextMenus.get(interaction.commandName),
        true,
        "ContextMenus"
      );
    else if (interaction.type === InteractionType.ApplicationCommand)
      loadCommandOptions(
        client,
        interaction,
        client.commands.slashCommands.get(interaction.commandName),
        true,
        "SlashCommand"
      );
    let user = await client.db.get(`User_${interaction.member.id}`);
    if (user !== interaction.member.id) {
      await client.db.set(
        `User_${interaction.member.id}`,
        interaction.member.id
      );
      let current_acc = await client.db.set(
        `Current_${interaction.member.id}`,
        0
      );
      let savings_acc = await client.db.set(
        `Savings_${interaction.member.id}`,
        5000
      );
      await client.db.set(
        `Networth_${interaction.member.id}`,
        current_acc + savings_acc
      );
    }
  },
};
