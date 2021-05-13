const config = require('../../../config.json')

module.exports = {
    name: 'test',
    desciption: 'Tests something',
    roles: [config.ROLES.STAFF.ADMIN, config.ROLES.STAFF.MOD],
    async execute(client, message, args) {
        message.reply('Hello the test worked!')
    }
}