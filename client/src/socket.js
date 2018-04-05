import config from '../../config.js'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient(config.ip + ':' + process.env.PORT || '3000')

module.exports = socket;
