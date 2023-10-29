const dotenv = require('dotenv')
dotenv.config()

const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, c => {
    console.log(`Hiii ${c.user.tag}`)
})

client.login(process.env.discord_bot_token)

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands')
const folders = fs.readdirSync(commandsPath)

for ( const folder of folders ) {
    const filespath = path.join(foldersPath, folder)
    const files = fs.readdirSync(filespath).filter(file => file.endsWith('.js'))
    for ( const file in files ){
        const filepath = path.join(filespath,file)
        const command = require(filepath)

        if ( 'data' in command && 'execute' in command ) {
            client.commands.set(command.data.name, command)
        }
        else {
            console.log(`The command at ${filespath} does not contain data or execute property`)
        }
    }
}

client.on( Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    
    const command = interaction.client.command.get(interaction.commandName)

    if(!command) {
        console.error(`No command of name ${interaction.commandName}`)
        return
    }

    try{
        await command.execute(interaction)
    }
    catch (error) {
        console.error(error)

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command", ephemeral: true })
        } else {
            await interaction.reply({ content: "There was an error while executing this command", ephemeral: true })
        }
    }
})