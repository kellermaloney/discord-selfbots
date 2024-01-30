require("dotenv").config();
const tokens = [process.env.RUNAWAYPICKLE_TOKEN, process.env.THETROUTIMP_TOKEN];

const channelId = process.env.CHANNEL_ID;

const messages = [
  "need help to understand exercise 2 the whole thing. Probably would take 20 min, Id pay $15",
  "need help interpreting MRST on 1.4, $3",
  "confused about what it means to 'equalize the mrts with price', would pay $5 for 15 min to chat about this and other things",
  "I cant get q=40 for 3.2, would appreciate help for $5",
  "$25 for 45 min of tutoring today?",
  "need help on 3.1/3.2 as well, $5",
  "would pay $20 for 30 min of tutoring on all the material covered in the hw",
  "check over the pset for $10",
  "literally just need to check q4, $3",
  "also need help on MRST 1.4, $3",
  "Need an hour of tutoring for midterm sometime this week, open to discuss price over dm",
];

tokens.forEach((token, index) => {
  setTimeout(async () => {
    const { Client } = require("discord.js-selfbot-v13");
    const client = new Client();

    client.on("ready", async () => {
      console.log(`${client.user.username} is ready!`);

      const channel = client.channels.cache.get(channelId);
      if (channel) {
        if (index < messages.length) {
          channel.send(messages[index]);
        }
      } else {
        console.log("Channel not found");
      }
    });

    // client.on("messageCreate", (message) => {
    //   if (message.content == "ping") {
    //     message.reply("pong");
    //   }
    // });

    console.log("logging in");
    client.login(token);
  }, index * 18000000); // Schedule the next bot to actiatee 1.8M milliseconds (30 minutes) after the previous is activated
});
