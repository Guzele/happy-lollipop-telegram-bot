const token = process.env.TELEGRAM_TOKEN;

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const word = match[1];
  bot.sendMessage(chatId, word);
});

bot.onText(/\/ping/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "pong");
});

module.exports = bot;
