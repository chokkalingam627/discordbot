const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder
          .setName('hiiii')
          .setDescription('Replies with heyy'),
    async execute(interaction) {
        await interaction.reply("heyyyy")
    },
}