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

                <MessagesChats :connections="connections" @on-chat-open="handleChatOpen" />
                <div class="hidden pt-2 meduim:block small:col-span-6 meduim:col-span-6">
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

onBeforeMount(() => {
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
    return connections.value.some((connection) => connection.recipient.id === recipient.id);
};
</script>
