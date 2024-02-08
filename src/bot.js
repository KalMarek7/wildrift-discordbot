require("dotenv").config({ path: "../.env" });
const { Client, IntentsBitField } = require("discord.js");
const { getChampionData } = require("./champion");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅  ${c.user.tag} is now running!`);
});

client.on("messageCreate", (message) => {
  //console.log(`${message.author.tag} said ${message.content}`);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log(interaction.commandName);
    if (interaction.commandName === "champion") {
      interaction.deferReply();
      const userInput = interaction.options.get("champion").value;
      getChampionData(userInput).then((champion) => {
        if (champion !== "No results") {
          const championEmbed = {
            color: 0x0099ff,
            title: champion.name,
            thumbnail: {
              url: champion.thumbnail,
            },
            fields: [
              /* {
                name: "\u200B",
                value: "\u200B",
              }, */
              {
                name: "\n",
                value: "\n",
              },
              {
                name: "Recommended Lane",
                value: champion.lane,
                inline: true,
              },
              {
                name: "Starting Item",
                value: champion.startingItem,
                inline: true,
              },
              {
                name: "Recommended Spells",
                value: champion.spells,
              },
              {
                name: "Recommended Runes",
                value: champion.runes,
                inline: true,
              },
              {
                name: "Core Items",
                value: champion.coreItems,
                inline: true,
              },
              {
                name: "Skills Order",
                value: champion.skills,
              },
              {
                name: "Champion Counters",
                value: champion.counters,
              },
              {
                name: "\n",
                value: "\n",
              },
            ],
            footer: {
              text: "Data from lolwildriftbuild.com and wildriftfire.com",
            },
          };
          interaction.editReply({ embeds: [championEmbed] });
        } else {
          const championEmbed = {
            color: 0xff0000,
            title: "No results",
            description: `No results for ${userInput}`,
          };
          interaction.editReply({ embeds: [championEmbed] });
        }
      });
    }
  }
});

client.login(process.env.TOKEN);
