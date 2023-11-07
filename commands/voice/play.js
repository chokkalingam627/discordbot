const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder
          .setName("play")
          .setDescription('plays song'),
    async execute(interaction) {
        await interaction.reply("Never Gonna Give You Up, Never Gonna Let You Down ")
    }
}