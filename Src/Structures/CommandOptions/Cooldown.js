module.exports = async function (client, message, command, isInteraction, interactionType, Discord) {
    if (!command.cooldown) return false;
    const currentTime = Date.now()
    const user = message.member.user
    const cooldown = command.cooldown
    const oldTime = await client.db.get(`CooldownSystem.${command.name}.${interactionType ?? "Normal"}.${user.id}`) ?? 0
    if (Math.floor(currentTime - oldTime) >= cooldown || oldTime == 0) {
        await client.db.setEx(`CooldownSystem.${command.name}.${interactionType ?? "Normal"}.${user.id}`, Math.floor(cooldown / 1000), Date.now().toString())
        return false;
    } else {
        if (command.returnCooldown == false || command.returnNoErrors) return true;
        else {
            const TIME = parseInt(oldTime) + parseInt(cooldown)
            const TimeStamp = `<t:${Math.floor(TIME / 1000)}:R>`
            await message.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setAuthor({
                        name: message.member.user.tag,
                        iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setColor(client.randomColor)
                    .setDescription(`**You are currently on a cooldown!**\n${client.emojis.cache.get('969586604865884200')} *Your cooldown ends ${TimeStamp}*`)],
                    ephemeral: interactionType ? true : false,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
                return true
            }
        }
    }