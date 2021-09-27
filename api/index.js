const { Telegraf } = require("telegraf");
const { parse, stringify } = require("flatted");
//importing functions
const bot = new Telegraf(process.env.BOT_TOKEN);
const { categories, allAPIs, randomAPIs } = require("./ApiCall.js");
//bot start response;
// randomAPIs().then((res) => {
// 	console.log(res);
// });
// The Principles of Psychology
bot.start((ctx) =>
	randomAPIs().then((res) => {
		ctx.reply(
			`
			🚀<strong>Welcome, enter /help to get list of all commands</strong>
		<strong>Here's a special one for you ;)</strong> &#10;
		<strong>Name - ${res.entries[0].API}</strong>
		<strong>Description - ${res.entries[0].Description}</strong>
		<strong>Link - ${res.entries[0].Link}</strong>
		<strong>Category- ${res.entries[0].Category}</strong>
			`,
			{ parse_mode: "HTML" }
		);
	})
);

bot.command("price", async (ctx) => {});

//send categories
bot.command("categories", async (ctx) => {
	try {
		categories().then((res) => {
			var categs = "";
			for (let i = 0; i < res.length; i++) {
				categs += "🚀" + res[i] + "\n\n";
			}
			console.log(categs);
			ctx.reply(categs);
		});
	} catch (err) {
		ctx.reply("something went wrong");
		console.log(err);
	}
});

//send random API
bot.command("random", async (ctx) => {
	try {
		randomAPIs().then((res) => {
			ctx.reply(
				`
		🚀<strong>Name - ${res.entries[0].API}</strong> &#10;
		🚀<strong>Description - ${res.entries[0].Description}</strong> &#10;
		🚀<strong>Link - ${res.entries[0].Link}</strong> &#10;
		🚀<strong>Category- ${res.entries[0].Category}</strong> &#10;
			`,
				{ parse_mode: "HTML" }
			);
		});
	} catch (err) {
		ctx.reply("something went wrong");
	}
});

//test message
bot.hears("hi", (ctx) => {
	ctx.reply("<strong>Working Nice</strong>", { parse_mode: "HTML" });
});
bot.launch();
