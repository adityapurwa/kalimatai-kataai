const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketIo = require('socket.io');
const ChatSocket = require('./socket/ChatSocket');
const ChatRepl = require('./console/ChatRepl');

const server = http.Server(app);
const io = socketIo.listen(server);
const chatHandler = new ChatSocket(io);
app.use(express.static(path.join(path.dirname(__dirname), 'public')));
server.listen(process.env.PORT || 8080);

console.log("KalimatAI Server attached @ " + (process.env.PORT || 8080));

const chatRepl = new ChatRepl(chatHandler);
chatHandler.afterLog(chatRepl.replCommand.bind(chatRepl));

chatRepl.replCommand();