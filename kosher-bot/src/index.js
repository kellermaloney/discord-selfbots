require('dotenv').config();

// require the necessary discord.js classes
const token = process.env.DISCORD_TOKEN;
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.commands = new Collection();

// Define the path to the 'commands' folder
const foldersPath = path.join(__dirname, 'commands');
// Read the directory contents of the 'commands' folder to get sub-folders
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each file in commands folder 
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Get all command files
    
    // loop through each file and add to collection
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the collection with key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a requied "data" or "execute" property.`);
        }
    }
}

// When the client is read, run this code (only once). 
// The distinction between `client: Client<boolean>`  
// and `readyClient: Client<true> is important.
// It makes some properties non-nullable
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// log in to Discord with client token
client.login(token);


// Allow the client to receive event notifications
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return; 

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
});