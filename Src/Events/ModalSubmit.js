const { default: axios } = require("axios");
const { InteractionType, ButtonStyle } = require("discord.js");
const {
  wordleEmoteYellow,
  wordleEmoteGreen,
  wordleEmoteRed,
} = require("../../Data/emotesData");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').ModalSubmitInteraction} interaction
   * @param {*} container
   */
  run: async (interaction, client, container) => {
    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "wordleModal") {
        const userInput = interaction.fields.getTextInputValue("word-input");
        if (userInput.length != 5) {
          await interaction.reply({
            embeds: [
              {
                author: {
                  name: interaction.user.tag,
                  icon_url: interaction.user.avatarURL({ dynamic: true }),
                },
                title: "Please enter a 5 lettered word only",
                color: 0xff0019,
              },
            ],
            ephemeral: true,
          });
        } else {
          let attempts = await client.db.get(
            `Wordle_Attempt_${interaction.member.id}`
          );
          let parsedAttempts = parseInt(attempts);
          parsedAttempts += 1;

          await client.db.set(
            `Wordle_Attempt_${interaction.member.id}`,
            parsedAttempts
          );

          const word = interaction.fields.getTextInputValue("word-input");

          let embedEdi = interaction.message.embeds[0];

          let ACTUAL_WORD;
          let alreadyExists = await client.db.get(
            `Word_${interaction.member.id}`
          );
          if (!alreadyExists) {
            const fetchWord = await axios.get(
              "https://random-word-api.herokuapp.com/word?length=5"
            );
            const word = fetchWord.data[0];
            ACTUAL_WORD = word;
            await client.db.set(`Word_${interaction.member.id}`, word);
          } else {
            ACTUAL_WORD = alreadyExists;
          }
          console.log(ACTUAL_WORD);
          let wordArray = ACTUAL_WORD.split("");
          let guessedWord = word.split("");
          let resultWordArray = [];
          let resultArry = [];
          console.table({
            actWord: wordArray,
            guessed: guessedWord,
          });
          for (let i = 0; i < ACTUAL_WORD.length; i++) {
            if (ACTUAL_WORD.includes(guessedWord[i])) {
              if (ACTUAL_WORD.charAt(i) === guessedWord[i]) {
                resultArry.push(wordleEmoteGreen[guessedWord[i].toLowerCase()]);
                resultWordArray.push(guessedWord[i]);
              } else {
                resultArry.push(
                  wordleEmoteYellow[guessedWord[i].toLowerCase()]
                );
                resultWordArray.push(guessedWord[i]);
              }
            } else {
              resultArry.push(wordleEmoteRed[guessedWord[i].toLowerCase()]);
              resultWordArray.push(guessedWord[i]);
            }
          }

          if (
            JSON.stringify(resultWordArray).toLowerCase() ==
            JSON.stringify(wordArray).toLowerCase()
          ) {
            await embedEdi["fields"].push({
              name: `Attempt ${parsedAttempts}`,
              value: resultArry.join("").toUpperCase(),
            });

            await embedEdi["fields"].push({
              name: "Correct word!",
              value: `You guessed the word on attempt ${parsedAttempts}`,
            });

            // Reward

            const current_bal = await client.db.get(
              `Current_${interaction.member.id}`
            );
            const currentLevel = await client.db.get(
              `Level_${interaction.member.id}`
            );
            const currentXP = await client.db.get(
              `XP_${interaction.member.id}`
            );
            let parsedLevel = parseInt(currentLevel);
            let parsedXP = parseInt(currentXP);
            parsedXP +=
              Math.floor(Math.random() * (100 - 50 + 1) + 10) * parsedLevel;

            if (parsedXP >= 1000 * parsedLevel) {
              parsedLevel += 1;
              await client.db.set(
                `Level_${interaction.member.id}`,
                parsedLevel
              );
              await client.db.set(`XP_${interaction.member.id}`, 0);
              await interaction.channel.send({
                embeds: [
                  {
                    author: {
                      name: interaction.user.tag,
                      icon_url: interaction.user.avatarURL({ dynamic: true }),
                    },
                    title: "You have leveled up!",
                    description: `You are now level ${parsedLevel}`,
                    color: 0xffffff,
                  },
                ],
              });
            } else {
              await client.db.set(`XP_${interaction.member.id}`, parsedXP);
            }

            let parsed_current_bal = parseInt(current_bal);
            console.log(parsedXP);
            parsed_current_bal += 10000;
            await client.db.set(
              `Current_${interaction.member.id}`,
              parsed_current_bal
            );

            interaction.message.components[0].components[0].data.style =
              ButtonStyle.Secondary;
            interaction.message.components[0].components[0].data.disabled = true;
            await client.db.set(`Wordle_Attempt_${interaction.member.id}`, 0);
            await interaction.update({
              embeds: [embedEdi],
              components: interaction.message.components,
            });
            await client.db.del(`Word_${interaction.member.id}`);
          } else if (parsedAttempts >= 6) {
            await embedEdi["fields"].push({
              name: `Attempt ${parsedAttempts}`,
              value: resultArry.join("").toUpperCase(),
            });

            await embedEdi["fields"].push({
              name: "You have used all your attempts",
              value: `The word was ${ACTUAL_WORD}`,
            });
            interaction.message.components[0].components[0].data.style =
              ButtonStyle.Secondary;
            interaction.message.components[0].components[0].data.disabled = true;
            await client.db.set(`Wordle_Attempt_${interaction.member.id}`, 0);
            await interaction.update({
              embeds: [embedEdi],
              components: interaction.message.components,
            });
            await client.db.del(`Word_${interaction.member.id}`);
          } else {
            await embedEdi["fields"].push({
              name: `Attempt ${parsedAttempts}`,
              value: resultArry.join("").toUpperCase(),
            });
            await interaction.update({
              embeds: [embedEdi],
            });
          }
        }
      }
    }
  },
};
