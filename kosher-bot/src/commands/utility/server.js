const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('provides information about the server.'),
    async execute(interaction) {
        // interaction.guild is the object representing the guild in which the command was run 
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
    }
}