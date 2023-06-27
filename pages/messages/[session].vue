<template>
    <Messages>
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <UISpinner />
        </div>

        <div v-else class="relative h-screen flex flex-col justify-between">
            <!-- header -->
            <div class="z-10 absolute left-0 right-0 top-0 backdrop-blur-md bg-[#ffffff78] dark:bg-[#ffffff05]">
                <div class="p-2 flex items-center gap-x-6">
                    <div class="flex items-center gap-x-2">
                        <div>
                            <NuxtLink :to="`/profile/${recipientUser.username}`">
                                <img
                                    v-if="recipientUser.profile?.avatar"
                                    :src="recipientUser.profile?.avatar"
                                    :alt="recipientUser.name"
                                    class="w-7 h-7 rounded-full object-cover"
                                />
                                <UIDefaultAvatar v-else class="w-7 h-7 rounded-full overflow-hidden bg-gray-600" />
                            </NuxtLink>
                        </div>
                        <span class="font-bold dark:text-white">{{ recipientUser.name }}</span>
                    </div>
                </div>
            </div>

            <!-- messages -->
            <div ref="messageContainer" class="overflow-y-auto grow">
                <div class="p-3 min-h-full flex flex-col justify-end gap-y-4">
                    <template v-for="mssg in messages" :key="`message-${mssg.id}`">
                        <div
                            class="grid gap-y-1"
                            :class="!isMessageFromMe(mssg.recipient.id) ? 'justify-end' : 'justify-start'"
                        >
                            <div
                                class="px-4 py-2 w-max rounded-full"
                                :class="
                                    !isMessageFromMe(mssg.recipient.id)
                                        ? 'bg-dim-600 rounded-br-lg justify-self-end'
                                        : 'bg-gray-600 rounded-bl-lg justify-self-start'
                                "
                            >
                                <span class="text-white">{{ mssg.message }}</span>
                            </div>
                            <span
                                class="text-xs text-gray-500"
                                :class="[
                                    !isMessageFromMe(mssg.recipient.id) ? 'justify-self-end' : 'justify-self-start',
                                ]"
                                >{{ mssg.created_at }}</span
                            >
                        </div>
                    </template>
                </div>
            </div>

            <!-- send button -->
            <div class="sticky bottom-0 left-0 px-3 py-2">
                <div class="flex items-center gap-x-2 = p-1 bg-gray-600 rounded-3xl">
                    <textarea
                        class="hide-scrollbar order-2 w-full rounded-full px-2 py-2 text-white focus:outline-none focus:ring-0 bg-inherit border-none resize-none"
                        placeholder="Start a new message"
                        v-model.trim="message"
                        rows="1"
                    ></textarea>

                    <!-- ICONS -->
                    <div class="order-1">
                        <div class="flex items-center justify-between w-full py-1">
                            <button
                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                            >
                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                    <g>
                                        <path
                                            d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
                                        ></path>
                                        <circle cx="8.868" cy="8.309" r="1.542"></circle>
                                    </g>
                                </svg>
                            </button>
                            <button
                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                            >
                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                    <g>
                                        <path
                                            d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"
                                        ></path>
                                        <path
                                            d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"
                                        ></path>
                                    </g>
                                </svg>
                            </button>

                            <button
                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                            >
                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                    <g>
                                        <path
                                            d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                                        ></path>
                                        <path
                                            d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"
                                        ></path>
                                        <circle cx="14.738" cy="9.458" r="1.478"></circle>
                                        <circle cx="9.262" cy="9.458" r="1.478"></circle>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button class="order-3" :disabled="!message">
                        <span>
                            <PaperAirplaneIcon
                                class="h-9 w-9 text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                                :class="message ? 'opacity-1 cursor-pointer' : 'opacity-50 cursor-default'"
                                @click="sendMessageFun"
                            />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </Messages>
</template>

<script setup>
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
definePageMeta({ middleware: ["auth"], layout: false });

const emits = defineEmits(["onSendMessage"]);

const { user } = useAuth();
const { ChatMessageCollection, sendMessage } = useMessage();

const messageContainer = ref(null);
const messages = ref([]);
const message = ref(null);
const recipientUser = ref({});
const loading = ref(false);

onUpdated(() => {
    scrollToBottom();
});

const scrollToBottom = () => {
    if (!messageContainer.value) return;
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
};

onMounted(() => {
    const recipient_id = useRoute().query.recipient;
    getMessages(recipient_id);
});

onBeforeUnmount(() => {
    leaveChannel(recipientUser.value.id);
    // console.log("leave channel");
});

const getMessages = async (recipient_id) => {
    try {
        loading.value = true;
        const { messagesArr, recipientObj } = await ChatMessageCollection(recipient_id);
        messages.value = messagesArr;

        recipientUser.value = recipientObj;
        subscribeToChannel(recipientUser.value.id);
        // console.log("join channel");
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const subscribeToChannel = (recipient_id) => {
    const channel = sortBroadcastKeys(user.value.id, recipient_id);
    // console.log(channel);
    window.Echo.private(`message.${channel}`).listen(".new.chat", (e) => {
        messages.value.push(e.message);
    });
};

const leaveChannel = (recipient_id) => {
    const channel = sortBroadcastKeys(user.value.id, recipient_id);
    // console.log(channel);
    window.Echo.leave(`message.${channel}`);
};

const sortBroadcastKeys = (user_id, recipient_id) => {
    return user_id < recipient_id ? user_id + "." + recipient_id : recipient_id + "." + user_id;
};

const isMessageFromMe = (recipient_id) => {
    return user.value.id == recipient_id;
};

const sendMessageFun = async () => {
    try {
        if (!message.value) return;
        const messageText = message.value;
        message.value = null;
        const { mssg } = await sendMessage(messageText, recipientUser.value.id, chatSession.value);
    } catch (error) {
        console.log(error);
    } finally {
        message.value = null;
    }
};

const chatSession = computed(() => {
    return useRoute().params.session;
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    width: 0.5em;
    background-color: transparent;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
