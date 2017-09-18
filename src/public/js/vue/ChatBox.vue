<template>
    <div class="chat-box">
        <chat-status :status="status"></chat-status>
        <chat-body :messages="messages" @button-action="onButtonAction($event)"></chat-body>
        <chat-form v-model="input.message" @send="sendMessage()" @typing="pingTyping()"></chat-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                socket: null,
                status: 'idle',
                messages: [],
                userId: null,
                handle: {
                    typingBouncer: null
                },
                input: {
                    message: ''
                }
            }
        },
        mounted() {
            this.connect();
        },
        methods: {
            connect() {
                this.status = 'connecting';
                this.socket = io.connect();
                this.status = 'connected';

                this.socket.on('id_assigned', this.onIdAssigned);
                this.socket.on('new_message', this.onNewMessage);
                this.socket.on('ping_typing', this.onPingTyping);
            },
            onPingTyping() {
                this.status = 'someone is typing';
                if (this.handle.typingBouncer) {
                    clearInterval(this.handle.typingBouncer);
                }
                this.handle.typingBouncer = setTimeout(() => {
                    this.status = 'connected';
                }, 3000);
            },
            onIdAssigned(id) {
                this.userId = id;
            },
            onNewMessage(message) {
                message.position = 'opposite';
                this.messages.push(message);
            },
            onButtonAction(event) {
                this.input.message = event.text;
            },
            sendMessage() {
                this.messages.push({
                    position: 'self',
                    type: 'text',
                    content: this.input.message
                });
                this.socket.emit('send_message', {
                    content: this.input.message
                });
                this.input.message = '';
            },
            pingTyping() {
                this.socket.emit('ping_typing');
            }
        }
    }
</script>