const config = require('../../config.json')

module.exports = {
    async execute(message, client) {
        if (!message.content.startsWith(config.PREFIX) || message.author.bot) { return; }

        // Turning string into args
        const args = message.content.slice(config.PREFIX.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();
    
        // Executing the command
        if (!client.commands.has(commandName)) { return; }

        const command = client.commands.get(commandName)

        if (command.roles) {
            if (message.member.roles.cache.some(role => command.roles.includes(role.id))) {
                command.execute(client, message, args)
            } else {
                message.reply('You don\'t have permission to execute that command!')
            }
        } else {
            command.execute(client, message, args)
        }
    }
}