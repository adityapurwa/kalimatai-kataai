window.Vue = require('vue');

Vue.component('app', require('./vue/App.vue'));
Vue.component('chat-box', require('./vue/ChatBox.vue'));
Vue.component('chat-status', require('./vue/ChatStatus.vue'));
Vue.component('chat-body', require('./vue/ChatBody.vue'));
Vue.component('chat-form', require('./vue/ChatForm.vue'));

const app = new Vue({
    el: '#app'
});