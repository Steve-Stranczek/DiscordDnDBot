import { Message } from "discord.js";
import { TextChannel } from "discord.js";

export default {
  callback: (message: Message, ...args: string[]) => {
    console.log("inside food command");
    console.log(message.channel.id);

    (message.client.channels.cache.get("987767883935404092") as TextChannel)
      .send(message.content.toString().replace("!food", ""))
      .then(function (msg) {
        msg.react("👍");
      });
  },
};
