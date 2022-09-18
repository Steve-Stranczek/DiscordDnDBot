import { Message } from "discord.js";
import { TextChannel } from "discord.js";

export default {
  callback: (message: Message, ...args: string[]) => {
    console.log("inside food command");
    console.log(message.channel.id);
    if (message.content.toString().replace("!food", "") !== "")
    {
      let input = message.content.toString().replace("!food", ""); 
      message.delete();
      (message.client.channels.cache.get("988189553661722626") as TextChannel)
        .send(input)
        .then(function (msg) {
          msg.react("👍");
        })
      }
  },
};
