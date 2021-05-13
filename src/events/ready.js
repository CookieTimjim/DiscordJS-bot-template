const { log } = require('../util/log')

module.exports = {
    async execute(client) {
        log('SUCCESS', `Bot started successfully as ${client.user.tag}`)
    }
}