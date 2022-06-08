"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        console.log(message.channel.id);
        if (message.channel.id === "983095803176423525") {
            message.client.channels.cache.get("983095841814372422").bulkDelete(25);
            console.log(args);
            console.log(message);
            message.client.channels.cache.get("983095841814372422").send("@everyone" + message.author.toString() + "will be hosting this week!");
        }
    },
};
