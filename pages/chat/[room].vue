<template>
    <div data-theme="light" class="max-w-[800px] mx-auto flex flex-col items-center gap-3">
        <h1 class="text-2xl sm:text-3xl text-center font-bold mb-4">Chat Room: {{ room }}</h1>
        <div class="h-[400px] w-full">
            <div class="w-full bg-slate-300 p-4 max-h-[380px] overflow-auto no-scrollbar  rounded-lg"
                ref="chatContainer">
                <div v-if="!messages.length">Loading</div>
                <div v-for="(msg, index) in messages" :key="index"
                    :class="chatStore.userName === msg.senderName ? 'chat chat-end' : 'chat chat-start'">
                    <div class="chat-header">{{ msg.senderName }}</div>
                    <div class="chat-bubble"
                        :class="chatStore.userName === msg.senderName ? 'chat-bubble-success text-white' : 'chat-bubble-primary'">
                        {{
                            msg.message }}</div>
                    <div class="chat-footer opacity-50">{{ (new Date(msg.now).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                    }) !== today.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }))
                        ?
                        new Date(msg.now).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                        }) : '' }} {{ new
                            Date(msg.now).toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            }) }}
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <input v-model="message" class="input input-bordered w-full focus:outline-none" placeholder="Type a message"
                @keyup.enter="sendMessage" />
        </div>
    </div>
</template>

<script setup>
import { io } from 'socket.io-client';
import { useChatStore } from '~/store/chatRoom';

// const socket = io('https://chatbackend-qcrc.onrender.com');
const socket = io('http://localhost:3001');
const route = useRoute();
const chatStore = useChatStore();

const room = route.params.room;
const message = ref('');
const messages = ref([]);
const today = new Date();
const chatContainer = ref(null);



function scrollToBottom() {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

watch(() => messages.value, () => {
    nextTick(() => {
        scrollToBottom();
    });
});

onMounted(() => {
    chatStore.setRoom(room);
    socket.on("prevMessages", (m) => {
        messages.value = m
    })
    socket.emit('joinRoom', room);
});

const sendMessage = () => {
    if (message.value) {
        socket.emit('chatMessage', { room, message: message.value, senderName: chatStore.userName });
        message.value = '';
    }
};
socket.on('loaded', (id) => {
    chatStore.id = id;
})

socket.on('chatMessage', (data) => {
    messages.value.push(data);
    nextTick(() => {
        scrollToBottom();
    });
});
</script>

<style scoped>
.messages {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    max-height: 300px;
    overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>