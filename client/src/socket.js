import config from '../../config.js'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient(config.ip+':'+'3000')

module.exports = socket;
