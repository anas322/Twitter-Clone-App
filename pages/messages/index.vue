<template>
    <Messages>
        <MessagesChats :connections="connections" @on-chat-open="handleChatOpen" />
        <MessagesInbox :messages="chatMessages" :recipient="chatRecipient" @on-send-message="handleSendMessage" />
    </Messages>
</template>

<script setup>
definePageMeta({ middleware: ["auth"], layout: false });
useHead({
    title: "Messages / Twitter",
});

const { initEcho } = Echo();
const { Connections, ChatMessageCollection, sendMessage } = useMessage();

const connections = ref([]);
const chatMessages = ref([]);
const chatRecipient = ref({});

onMounted(() => {
    initEcho();
    window.Echo.private("message.2.3").listen(".new.chat", (e) => {
        alert(e.message);
        console.log(e.message);
    });
    getConnections();
});

const getConnections = async () => {
    try {
        const { chats } = await Connections();
        connections.value = chats;
    } catch (error) {
        console.log(error);
    }
};

const handleChatOpen = async (recipient) => {
    try {
        const { messages } = await ChatMessageCollection(recipient.id);
        chatMessages.value = messages;
        chatRecipient.value = recipient;
    } catch (error) {
        console.log(error);
    }
};

const handleSendMessage = async (messageText, recipient_id) => {
    try {
        const { message } = await sendMessage(messageText, recipient_id);

        chatMessages.value.push(message);
    } catch (error) {
        console.log(error);
    }
};
</script>
