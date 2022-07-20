const Eris = require("eris");
const TOKEN = require("./config.json");

const bot = new Eris(TOKEN.botToken);
bot.on("ready", () => {
  console.log("Ready!");
});
bot.on("messageCreate", (msg) => {
  if (msg.content === "!ping") {
    bot.createMessage(msg.channel.id, "Pong!");
  }
});
bot.connect();
