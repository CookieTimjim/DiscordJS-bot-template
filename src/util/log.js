const dateFormat = require('dateformat')

const types = {
    'ERROR': '\x1b[31m',
    'WARN': '\x1b[93m',
    'SUCCESS': '\x1b[32m',
    'CLIENT': '\x1b[31m'
}

module.exports = {
    /**
     * @param {String} type The event type
     * @param {String} message The message that is to be logged
     **/
    log(type, message) {
        const date = dateFormat(new Date(), 'mmm dS h:MMtt')
        const event = `\x1b[1m${types[type]}[${type}]\x1b[0m`
        console.log(`\x1b[33m${date}: ${event} ${message}`)
    }
}