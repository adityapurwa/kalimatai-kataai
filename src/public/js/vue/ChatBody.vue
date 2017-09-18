<template>
    <div class="chat-body" ref="body">
        <div class="chat-message" :class="{'chat-message-self': message.position === 'self'}"
             v-for="message in messages">
            <div v-if="message.type === 'text'">
                {{message.content}}
            </div>
            <div v-else-if="message.type === 'template'">
                <button class="btn btn-default btn-block" v-for="item in message.items"
                        @click="$emit('button-action', item)">
                    {{item.text}}
                </button>
            </div>
            <div class="chat-meta">
                {{message.user}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            messages: null
        },
        updated(){
            // Automatically scroll the body to latest message
            this.$refs.body.scrollTop = this.$refs.body.scrollHeight;
        }
    }
</script>