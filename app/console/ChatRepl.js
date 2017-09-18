const readline = require('readline');

class ChatRepl{
    constructor(chatHandler){
        this.stdio = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.chatHandler = chatHandler;
    }

    replCommand() {
        this.stdio.question('KalimatAI > ', (command) => {
            let safeCommand = command.trim();
            let typeIntent = /^type (.+)$/.exec(safeCommand);
            if (typeIntent) {
                this.chatHandler.sendServerMessage({
                    user: 'SERVER',
                    type: 'text',
                    content: typeIntent[1]
                });
            }
            let buttonIntent = /^buttons (.+)$/.exec(safeCommand);
            if (buttonIntent) {
                let buttons = buttonIntent[1].split(' ');
                this.chatHandler.sendServerMessage({
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
            this.replCommand();
        });
    }

}

module.exports = ChatRepl;