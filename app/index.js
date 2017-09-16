const express = require('express');
const path = require('path');
const http = require('http');
const readline = require('readline');
const app = express();
const socketIo = require('socket.io');
const ChatSocket = require('./socket/ChatSocket');

const server = http.Server(app);
const io = socketIo.listen(server);
const chatHandler = new ChatSocket(io);

app.use(express.static(path.join(path.dirname(__dirname), 'public')));
server.listen(3000);

const stdio = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function replCommand() {
    stdio.question('KalimatAI > ', (command) => {
        let safeCommand = command.trim();
        let typeIntent = /^type (.+)$/.exec(safeCommand);
        if (typeIntent) {
            chatHandler.sendServerMessage({
                user: 'SERVER',
                type: 'text',
                content: typeIntent[1]
            });
        }
        let buttonIntent = /^buttons (.+)$/.exec(safeCommand);
        if (buttonIntent) {
            let buttons = buttonIntent[1].split(' ');
            chatHandler.sendServerMessage({
                type: 'template',
                user: 'SERVER',
                items: buttons.map((text) => {
                    return {
                        item: "button",
                        text
                    }
                })
            });
        }
        replCommand();
    });
}

chatHandler.afterLog(replCommand);

replCommand();