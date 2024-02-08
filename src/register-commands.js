require("dotenv").config({ path: "../.env" });
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "champion",
    description: "Gives champion info",
    options: [
      {
        name: "champion",
        description: 'Champion"s name',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function myFunc() {
  try {
    console.log("Registering slash commands...");

    // this is to clear commands globally
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: [],
    });

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("Slash commands were registered");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
}

myFunc();
