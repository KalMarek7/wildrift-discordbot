# Wild Rift Discord Bot

This project is a simple discord bot that allows to look up Wild Rift champion information. The primary goal of this project was to finally build something that would be useful to me and/or my friends. Throughout building this bot I had the opportunity to learn about node.js runtime and npm ecostystem, namely how to initialize new project and manage dependencies. The bot has one slash command (/champion) that accepts the champion's name and is then scraping two websites ([https://lolwildriftbuild.com/](https://lolwildriftbuild.com/) & [https://wildriftfire.com/](https://wildriftfire.com/)) to finally present nicely formatted champion details as a discord embed card.

![Screenshot](https://i.ibb.co/ScBJBg3/wrbot.png "Screenshot of the WRBot")

## Technologies used

- **[Node.js](https://nodejs.org/en):** JavaScript runtime environment.
- **[discord.js](https://discord.js.org/):** Node.js module that allows to interact with the Discord API.
- **[Axios](https://axios-http.com/):** Promise based HTTP client for the browser and node.js.
- **[dotenv](https://github.com/motdotla/dotenv#readme):** Zero-dependency module that loads environment variables from a .env file.

## How to Use

To use the bot you need to create `.env` file and supply your individual authentication details - refer to `.env.example`. You can also check [Discord Developer Platform](https://discord.com/developers/docs/intro) for more information on how to create the app and where to find the details. Also, below you will find bot permissions in OAuth2 settings I setup for my app:

![Screenshot](https://i.ibb.co/0cCs2TB/bot-auth.png "Screenshot of the bot permissions")

Next, you need to register bot's slash command by running `register-commands.js`. This is required only once per server. After that, you should be able to run `bot.js` and prompt the bot by `/champion` command followed by the champion's name.