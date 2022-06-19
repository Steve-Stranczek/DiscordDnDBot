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

let deleteFoodMessages = new CronJob("0 23 * * WED", () => {
  (client.channels.cache.get("988189553661722626") as TextChannel).bulkDelete(
    100
  );
});

let pickBestFood = new CronJob("0 15 * * WED", () => {
  (client.channels.cache.get("988189553661722626") as TextChannel).messages
    .fetch({ limit: 50 })
    .then((messages) => {
      let tuple: [number, string] = [0, "test"];
      messages.forEach((message) => {
        let count = message.reactions.cache.get("👍")?.count;
        if (count != null && count > tuple[0]) {
          tuple[0] = count;
          tuple[1] = message.content;
        }
      });
      (client.channels.cache.get("859497250732244995") as TextChannel).send(
        "@everyone " +
          tuple[1] +
          " is what we will be eating!  Please send a message saying what you want!"
      );
    });
});

deleteFoodMessages.start();
pickBestFood.start();

client.login(process.env.TOKEN);
