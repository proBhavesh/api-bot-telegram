const { Telegraf, Markup } = require("telegraf");
const { parse, stringify } = require("flatted");
//importing functions
const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);
if (token === undefined) {
	throw new Error("BOT_TOKEN must be provided!");
}
const { categories, allAPIs, randomAPI, userQuery } = require("./ApiCall.js");

//bot start response;
bot.start((ctx) => {
	try {
		return ctx.reply(
			`
			<strong></strong>
		🚀<strong>Welcome to the bot, here choose between 500+ APIs in 40+ categories</strong> &#10;
		🚀<strong>Commands - &#10 /random - Get random API &#10; /categories - Get all the categories</strong> &#10;
		🚀<strong>Inline Mode - Search for APIs using in-line mode &#10; @APIs_for_Developers_bot</strong> &#10;
			`,
			{ parse_mode: "HTML" }
		);
	} catch (err) {
		return ctx.reply("something went wrong");
	}
});

//send categories
bot.command("categories", async (ctx) => {
	try {
		return categories().then((res) => {
			var categs = "";
			for (let i = 0; i < res.length; i++) {
				categs += "🚀" + res[i] + "\n\n";
			}
			console.log("This is cate");
			return ctx.reply(categs);
		});
	} catch (err) {
		ctx.reply("something went wrong");
		return console.log(err);
	}
});

//send random API
bot.command("random", async (ctx) => {
	try {
		return randomAPI().then((res) => {
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
		return ctx.reply("something went wrong");
	}
});

//test message
bot.hears("hi", (ctx) => {
	return ctx.reply("<strong>Working Nice</strong>", { parse_mode: "HTML" });
});

//inline quiries
bot.on("inline_query", async (ctx) => {
	try {
		if (!ctx.inlineQuery.query) {
			return console.log("Enter a query");
		}
		// console.log(ctx.inlineQuery.query);
		const queryResponse = await userQuery(ctx.inlineQuery.query);
		const result = await queryResponse.data.entries;
		// console.log(await result);
		if ((await queryResponse.data.count) == 0) {
			const errorResponse = [
				{
					type: "article",
					id: 1,
					title: "Nothing Found",
					description: "Nothing Found",
					// thumb_url: Link,
					input_message_content: {
						message_text: "Nothing Found",
					},
					reply_markup: Markup.inlineKeyboard([
						Markup.button.url("Go to API", "Nothing Found"),
					]),
				},
			];
			return ctx.answerInlineQuery(errorResponse);
			// return await ctx.answerInlineQuery("nothing found");
		}
		const apis = await result.map(({ API, Description, Link }) => ({
			type: "article",
			id: API,
			title: API,
			description: Description,
			// thumb_url: Link,
			input_message_content: {
				message_text: API + "\n" + Link,
			},
			reply_markup: Markup.inlineKeyboard([
				Markup.button.url("Go to API", Link),
			]),
		}));
		// console.log(await apis);
		return await ctx.answerInlineQuery(apis.slice(0, 8));
	} catch (err) {
		const errorResponse = [
			{
				type: "article",
				id: 1,
				title: "something went wrong",
				description: "something went wrong",
				// thumb_url: Link,
				input_message_content: {
					message_text: "something went wrong",
				},
				reply_markup: Markup.inlineKeyboard([
					Markup.button.url("Go to API", "something went wrong"),
				]),
			},
		];
		return ctx.answerInlineQuery(errorResponse);
	}
});
bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
