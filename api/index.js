const { Telegraf } = require("telegraf");
const { parse, stringify } = require("flatted");
const fs = require("fs");
//importing functions
const bot = new Telegraf(process.env.BOT_TOKEN);
//bot start response;
bot.start((ctx) =>
	ctx.reply("Welcome, enter /price to check the details of token")
);

bot.command("price", async (ctx) => {});

//test message
bot.hears("hi", (ctx) => {
	ctx.reply("<strong>Working Nice</strong>", { parse_mode: "HTML" });
});
bot.launch();
