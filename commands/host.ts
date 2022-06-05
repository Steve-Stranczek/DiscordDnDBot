import { Message } from "discord.js";
import { TextChannel } from "discord.js";

export default {
  callback: (message: Message, ...args: string[]) => {
    console.log(message.channel.id);
    if (message.channel.id === "983095803176423525") {
      (
        message.client.channels.cache.get("983095841814372422") as TextChannel
      ).bulkDelete(25);
      console.log(args);
      console.log(message);
      (
        message.client.channels.cache.get("983095841814372422") as TextChannel
      ).send(
        "@everyone" + message.author.toString() + "will be hosting this week!"
      );
    }
  },
};
