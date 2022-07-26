const chalk = require("chalk")
const Box = require("cli-box")
const { ActivityType } = require('discord.js')
module.exports = {
    name: "ready",
    once: true,
    run: async(client) => {
        client.user.setActivity('Polars Mom', {
            type: ActivityType.Watching,
        })
        const ClientBox = new Box({
            w: Math.floor(client.user.tag.length + 27 ),
            h: 7,
            stringify: false,
            marks: {
              nw: '╭',
              n: '─',
              ne: '╮',
              e: '│',
              se: '╯',
              s: '─',
              sw: '╰',
              w: '│'
            },
            hAlign: 'left',
          }, `C L I E N T   I N F O R M A T I O N

Client Details    ::    ${client.user.tag}
Guilds Count      ::    ${client.guilds.cache.size}
User Count        ::    ${client.users.cache.size}
NodeJS Version    ::    ${process.version}
`).stringify()

        const CommandsBox = new Box({
            w: Math.floor(`Initiating ${client.commands.messageCommands.aliases.size} messageCommands Aliases.`.length + 37),
            h: 8,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│'
            },
            hAlign: "left",
        }, `C O M M A N D S   I N F O R M A T I O N

MessageCommands            ::    Initiating ${client.commands.messageCommands.size} messageCommands.
MessageCommands Aliases    ::    Initiating ${client.commands.messageCommands.aliases.size} messageCommands Aliases.
SlashCommands              ::    Initiating ${client.commands.slashCommands.size} slashCommands.
SelectMenus                ::    Initiating ${client.commands.selectMenus.size} selectMenus.
ContextMenus               ::    Initiating ${client.commands.contextMenus.size} contextMenus.
ButtonCommands             ::    Initiating ${client.commands.buttonCommands.size} buttonCommands.
Client Events              ::    Initiating ${client.events.size} events.
`).stringify()

        console.log(chalk.bold.greenBright(ClientBox))
        console.log(chalk.bold.blueBright(CommandsBox))

        let clanID = await client.db.get("ClanIDs");
        if (!clanID) {
            await client.db.set('ClanIDs', 1000000)
        }

    }
}