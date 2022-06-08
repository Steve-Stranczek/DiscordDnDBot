"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const { port } = require("./config.json");
const path = require("node:path");
const express = require("express");
const app = express();
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
app.get("/", (request, response) => {
    return response.sendFile("index.html", { root: "." });
});
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on("ready", () => {
    let handler = require("./command-handler");
    if (handler.default)
        handler = handler.default;
    handler(client);
});
client.login(process.env.TOKEN);
