import DiscordJs, { Intents, Client, Collection } from "discord.js";
import "dotenv/config";
const { port } = require("./config.json");
const path = require("node:path");
const express = require("express");

const app = express();

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

app.get("/", (request: any, response: any) => {
  return response.sendFile("index.html", { root: "." });
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  let handler = require("./command-handler");
  if (handler.default) handler = handler.default;

  handler(client);
});

client.login(process.env.TOKEN);
