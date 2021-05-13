const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')

const { log } = require('./src/util/log')

const client = new Discord.Client()
client.commands = new Discord.Collection()

function loadCommandsAndEvents() {

    // Reading command files
    const commandFolders = fs.readdirSync('./src/commands').filter(f => !f.includes('.'))
    for (const folder in commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${commandFolders[folder]}`).filter(file => file.endsWith('.js'))
        for (const commandFile in commandFiles) {
            const command = require(`./src/commands/${commandFolders[folder]}/${commandFiles[commandFile]}`)
            client.commands.set(command.name, command)
            log('CLIENT', `Loaded ${commandFolders[folder]} command ${command.name}.`)
        }
    }

    // Reading event files
    const eventFolder = fs.readdirSync('./src/events').filter(f => f.endsWith('.js'))
    for (const eventFile in eventFolder) {
        const event = require(`./src/events/${eventFolder[eventFile]}`)
        const eventName = eventFolder[eventFile].split('.')[0]

        if (event.once) {
            client.once(eventName, (...args) => event.execute(...args, client))
        } else {
            client.on(eventName, (...args) => event.execute(...args, client))
        }

        log('CLIENT', `Loaded discord event ${eventName}.`)
    }
}

client.login(config.TOKEN).then(() => loadCommandsAndEvents())

// Exporting client incase we'd need to use it in a utils file.
module.exports = { client }