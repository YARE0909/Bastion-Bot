(async () => {
const Discord = require("discord.js");
const config = require("./Config");
const redis = require('redis')
const { Colors } = require('./Colors');
const WithoutHast = Colors.map(x => x.replace('#', ''));
const redisClient = redis.createClient()
await redisClient.connect()
const dotenv = require("dotenv");
dotenv.config();
const path = __dirname;
const client = new Discord.Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildPresences,
        Discord.IntentsBitField.Flags.DirectMessages,
        Discord.IntentsBitField.Flags.DirectMessageReactions,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildWebhooks,
        Discord.IntentsBitField.Flags.GuildVoiceStates,
        Discord.IntentsBitField.Flags.GuildInvites,
        Discord.IntentsBitField.Flags.GuildBans,
        Discord.IntentsBitField.Flags.MessageContent
    ],
    partials: ["Channel"]
});
exports.client = client;
exports.path = path;
exports.config = config;
client.commands = {};
client.randomColor = Discord.resolveColor(WithoutHast[Math.floor(Math.random() * WithoutHast.length)])
client.events = new Discord.Collection();
client.commands.messageCommands = new Discord.Collection();
client.commands.messageCommands.aliases = new Discord.Collection();
client.commands.contextMenus = new Discord.Collection();
client.commands.slashCommands = new Discord.Collection();
client.commands.buttonCommands = new Discord.Collection();
client.commands.selectMenus = new Discord.Collection();
client.db = redisClient
    
const Handler = require(`${path}/Src/Structures/Handlers/Handler`);
await Handler.loadMessageCommands(client, path);
await Handler.loadEvents(client);
await client.login(process.env.token2);
await Handler.loadSlashCommands(client, path);
await Handler.loadContextMenus(client, path);
await Handler.loadButtonCommands(client, path);
await Handler.loadSelectMenus(client, path);
})()