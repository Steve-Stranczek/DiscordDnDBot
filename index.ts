import DiscordJs, { Intents, Client, Collection } from "discord.js";
import "dotenv/config";
const path = require("node:path");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  let handler = require("./command-handler");
  if (handler.default) handler = handler.default;

  handler(client);
});

client.login(process.env.TOKEN);
