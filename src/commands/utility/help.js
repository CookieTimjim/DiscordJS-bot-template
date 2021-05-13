const Discord = require('discord.js')
const config = require('../../../config.json')

module.exports = {
    name: 'help',
    desciption: 'List of all commands.',
    async execute(client, message, args) {
        const { commands } = client

        if (args[0] === undefined) {
            const embed = new Discord.MessageEmbed()
            .setAuthor('Here\'s a list of all my commands!')
            .setDescription('`' + commands.map(cmd => cmd.name).join('`, `') + '`')
            .setFooter(`You can do ${config.PREFIX}help [command name] to get the info of a specific command!`)

            return message.channel.send(embed)
        } else {
            const command = commands.get(args[0].toLowerCase())

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Here's info on the ${args[0]} command!`)
            .setDescription(`**Desciption:** ${command.desciption}`)

            return message.channel.send(embed)
        }
    }
}