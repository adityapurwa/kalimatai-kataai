const readline = require('readline');

class ChatRepl {
    constructor(chatHandler) {
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
            let handled = false;
            if (typeIntent) {
                this.chatHandler.sendServerMessage({
                    user: 'SERVER',
                    type: 'text',
                    content: typeIntent[1]
                });
                handled = true;
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
                handled = true;
            }

            if (!handled) {
                console.log('KalimatAI > Unsupported command, try `type hello` or `buttons yes no`');
            }
            this.replCommand();
        });
    }

}

module.exports = ChatRepl;