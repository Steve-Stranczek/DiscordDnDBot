import DiscordJs, {
  CommandInteractionOptionResolver,
  Intents,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new DiscordJs.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log("The bot is ready!");
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply({
      content: "pong",
    });
  }
});

client.login(process.env.TOKEN);
