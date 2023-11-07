const dotenv = require('dotenv')
dotenv.config()

const {Routes, REST} = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

const commands = []

const foldersPath = path.join(__dirname, 'commands')
const folders = fs.readdirSync(foldersPath)

for (const folder of folders) {
    const filespath = path.join(foldersPath,folder)
    const files = fs.readdirSync(filespath).filter(file => file.endsWith('.js'))
    for (const file of files) {
        const filepath = path.join(filespath,file)
        const command = require(filepath)

        if ('data' in command && 'execute' in command){
            commands.push(command.data.toJSON())
        }
        else {
            console.log(`The command at ${filepath} does not contain data or execute property`)
        }        
    } 
}

token = process.env.discord_bot_token
clientId = process.env.client_id
guildId = process.env.server_id


console.log('hii64645')
const rest = new REST().setToken(token);
(async () => {
    try {
        console.log(`Started Registering ${commands.length} application commands`)

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        )

        console.log(`Successfully reloaded ${data.length} application commands.`)
    }
    catch (error) {
        console.error(error)
    }
})()
