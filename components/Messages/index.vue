<template>
    <div :class="{ dark: darkMode }">
        <div class="min-h-full dark:bg-dim-900">
            <div class="grid grid-cols-12 mx-auto small:max-w-3xl meduim:max-w-6xl large:max-w-[1300px]">
                <!-- start left sidebar -->
                <div class="hidden small:block mx-auto col-span-2 meduim:col-span-1 large:col-span-2">
                    <div class="sticky top-0">
                        <SidebarLeft @on-tweet="handleModalOpen" />
                    </div>
                </div>
                <!-- end left sidebar -->

                <div
                    class="meduim:col-span-4 dark:border-white/20 border-x border-gray-200"
                    :class="[
                        $route.params?.session
                            ? 'hidden col-span-12 meduim:block medium:col-span-10'
                            : 'col-span-12 small:col-span-10',
                    ]"
                >
                    <div class="p-3">
                        <span class="font-semibold dark:text-white text-xl">Messages</span>
                    </div>

                    <div v-if="loading" class="flex justify-center items-center h-screen">
                        <UISpinner />
                    </div>
                    <MessagesChats v-else :connections="connections" @on-chat-open="handleChatOpen" />
                </div>

                <div
                    class="meduim:col-span-6 pt-2"
                    :class="[
                        $route.params?.session
                            ? 'col-span-12 small:col-span-10'
                            : 'hidden meduim:block small:col-span-6',
                    ]"
                >
                    <div class="border-x border-gray-200 dark:border-white/20 relative h-screen">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const { openPostTweetModal } = useTweets();

const handleModalOpen = () => {
    openPostTweetModal();
};

const { useThemeMode } = useTheme();

const darkMode = useThemeMode();

const emitter = useEmitter();

const { Connections, getSession } = useMessage();

const connections = ref([]);
const sessionVal = ref("");
const loading = ref(true);

onBeforeMount(() => {
    getConnections();
});

const getConnections = async () => {
    try {
        const { chats } = await Connections();
        connections.value = chats;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

emitter.$on("newMessageNotifications", (connection) => {
    if (isRecipientExists(connection.recipient)) {
        return;
    }
    connections.value.unshift(connection);
});

const handleChatOpen = async (recipient) => {
    try {
        if (sessionVal.value == useRoute().params?.session) return;

        const { session } = await getSession(recipient.id);
        sessionVal.value = session.uuid;
        navigateTo(`/messages/${session.uuid}?recipient=${recipient.id}`);
    } catch (error) {
        console.log(error);
    }
};

emitter.$on("openChat", (recipient) => {
    if (isRecipientExists(recipient)) {
        // here the code of ++++++++++++
        handleChatOpen(recipient);
        return;
    }
    handleChatOpen(recipient);
});

const isRecipientExists = (recipient) => {
    if (connections.value.length === 0) return false;
    console.log(connections.value);
    return connections.value.some((connection) => connection.recipient.id === recipient.id);
};
</script>
