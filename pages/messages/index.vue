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
const { user } = useAuth();
const { Connections, ChatMessageCollection, sendMessage } = useMessage();

const connections = ref([]);
const chatMessages = ref([]);
const chatRecipient = ref({});

onMounted(() => {
    initEcho();
    getConnections();
});

const subscribeToChannel = (recipient_id) => {
    const channel = sortBroadcastKeys(user.value.id, recipient_id);
    console.log(channel);
    window.Echo.private(`message.${channel}`).listen(".new.chat", (e) => {
        chatMessages.value.push(e.message);
    });
};

const leaveChannel = (recipient_id) => {
    const channel = sortBroadcastKeys(user.value.id, recipient_id);
    console.log(channel);
    window.Echo.leave(`message.${channel}`);
};

const sortBroadcastKeys = (user_id, recipient_id) => {
    return user_id < recipient_id ? user_id + "." + recipient_id : recipient_id + "." + user_id;
};

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
        if (chatRecipient.value && chatRecipient.value.id === recipient.id) return;

        if (chatRecipient.value.id && chatRecipient.value.id != recipient.id) {
            console.log("leaving channel");
            leaveChannel(chatRecipient.value.id);
        }

        const { messages } = await ChatMessageCollection(recipient.id);
        chatMessages.value = messages;
        chatRecipient.value = recipient;
        subscribeToChannel(recipient.id);
        console.log("join channel");
    } catch (error) {
        console.log(error);
    }
};

const handleSendMessage = async (messageText, recipient_id) => {
    try {
        const { message } = await sendMessage(messageText, recipient_id);

        // chatMessages.value.push(message);
    } catch (error) {
        console.log(error);
    }
};
</script>
