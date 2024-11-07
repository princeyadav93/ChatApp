<template>
    <div class="max-w-[800px] mx-auto flex flex-col items-center gap-3">
        <h1 class="text-3xl text-center font-bold mb-4">Create or Join a Chat Room</h1>
        <input type="text" v-model="userName" name="name" placeholder="Enter your name"
            class="input input-bordered input-accent w-full max-w-xs focus:outline-none">
        <div class="flex flex-col sm:flex-row gap-2 w-full max-w-xs ">
            <input type="text" v-model="roomName" @keyup.enter="joinRoom" name="name" placeholder="Enter Room Name"
                class="input input-bordered input-accent w-full max-w-xs focus:outline-none">
            <button @click="joinRoom" class="btn btn-accent w-full sm:w-24 text-white ">Join</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useChatStore } from '~/store/chatRoom';

const router = useRouter();

const roomName = ref('');
const userName = ref('');

const joinRoom = () => {
    if (userName.value.trim() === '') return alert('Please enter your name');
    if (roomName.value.trim() === '') return alert('Please Create a room or join a room');

    const chatStore = useChatStore();
    chatStore.userName = userName.value.trim();
    chatStore.setRoom(roomName.value);
    router.push(`/chat/${roomName.value}`);

};
</script>

<style scoped></style>