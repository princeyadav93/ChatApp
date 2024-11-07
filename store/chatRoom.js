import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chatRoom", () => {
    const chatRoom = ref([]);
    let id = ref('')
    let userName = ref('');

    const setRoom = (roomName) => {
        chatRoom.value.push(roomName);
    };

    return { setRoom, id, userName };
},
    {
        persist: true
    }

);