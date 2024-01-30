require("dotenv").config();
const tokens = [
  process.env.THETROUTIMP_TOKEN,
  process.env.TROJAN_ECON_TOKEN,
  process.env.YOUNGINDER_TOKEN,
  process.env.MOJO_TOKEN,
  process.env.FIGHT_ON_TOKEN,
  process.env.KLOB_GOBBLER_TOKEN,
  process.env.YOUNGINDER_TOKEN,
  process.env.THETROUTIMP_TOKEN,
  process.env.FIGHT_ON_TOKEN,
  process.env.TROJAN_ECON_TOKEN,
];

const channelId = process.env.CHANNEL_ID;

// Generate a random number between 0 and 60 minutes
const TIME_DELAY_IN_MS = Math.random() * 36000000;

const messages = [
  "need help to understand exercise 2 the whole thing. Probably would take 20 min, Id pay $12",
  "need help interpreting MRTS on 1.4, $5",
  "confused about what it means to 'equalize the mrts with price', would pay $8 for 15 min to chat about this and other things",
  "I cant get q=40 for 3.2, would appreciate help for $5",
  "$25 for 45 min of tutoring today btwn 3-5?",
  "need help on 3.1/3.2 as well, $8",
  "would pay $20 for 30 min of tutoring on all the material covered in the hw",
  "check over the pset for $10",
  "literally just need to check over q4, $5",
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

    // console.log("logging in with", token);
    client.login(token);
  }, index * TIME_DELAY_IN_MS); // Schedule the next bot to actiatee 1.8M milliseconds (30 minutes) after the previous is activated
});
