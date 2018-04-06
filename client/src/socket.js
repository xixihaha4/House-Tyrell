import config from '../../config.js'
import socketIOClient from 'socket.io-client'

// uncomment for ec2 instance
const socket = socketIOClient(config.ip)
//


// const socket = socketIOClient(config.ip + ':' + process.env.PORT || '3000')
// comment this if on localhost

module.exports = socket;
