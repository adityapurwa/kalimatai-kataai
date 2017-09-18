<template>
    <div class="chat-form">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Type your message here"
                   :value="value" @input="bubble()"
                   @keyup="$emit('typing')"
                   @keyup.13="$emit('send')"
                   ref="message"/>
            <span class="input-group-btn">
                <button class="btn btn-primary" @click="$emit('send')">
                    Send
                </button>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        computed: {},
        props: {
            value: null
        },
        methods: {
            bubble() {
                this.$emit('input', this.$refs.message.value);
            }
        }
    }
</script>