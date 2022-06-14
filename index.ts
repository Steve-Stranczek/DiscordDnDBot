import DiscordJs, {
  Intents,
  Client,
  Collection,
  TextChannel,
} from "discord.js";
import "dotenv/config";
import { CronJob } from "cron";
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

let job = new CronJob("* * * * *", () => {
  (client.channels.cache.get("982622537395609642") as TextChannel).send(
    "Hello!"
  );
});

job.start();

client.login(process.env.TOKEN);
