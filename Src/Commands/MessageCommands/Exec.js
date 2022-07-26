const { exec } = require("child_process")
const { ButtonStyle } = require('discord.js')
module.exports = {
    name: 'exec',
    ownerOnly: true,
    run: async (client, message, args, container) => {
        const row = new container.Discord.ActionRowBuilder()
        .addComponents(
            new container.Discord.ButtonBuilder()
            .setCustomId('evalbtn')
            .setLabel('Delete Output')
            .setStyle(ButtonStyle.Danger)
            )
            let lola = args.join(" ")
            if (!lola) return await message.channel.send({ content: "Please provide what to execute in the terminal!" })
            exec(`${lola}`, (error, stdout) => {
                let response = (error || stdout)
                if (error) {
                    message.channel.send({
                        content:`\`\`\`js\n${error.message}\n\`\`\``,
                        components: [row]
                    })
                } else {
                    message.channel.send({
                        content:`\`\`\`js\n${response}\n\`\`\``,
                        components: [row]
                    })
                }
            })
        }
    }