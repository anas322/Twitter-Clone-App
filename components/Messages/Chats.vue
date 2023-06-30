<template>
    <!-- start list of messages -->
    <div class="min-h-screen">
        <div>
            <article v-for="(conn, index) in props.connections" :key="`connection-${conn?.id}`">
                <div
                    v-if="conn"
                    class="flex items-center p-3 gap-x-3 hover:bg-gray-50 dark:hover:bg-white/10 transition cursor-pointer"
                    @click="handleChatOpen(conn.recipient)"
                >
                    <!-- image  -->
                    <div class="min-w-max">
                        <img
                            v-if="conn.recipient.profile.avatar"
                            :src="conn.recipient.profile.avatar"
                            :alt="conn.recipient.name"
                            class="w-12 h-12 rounded-full object-cover"
                        />
                        <UIDefaultAvatar v-else class="w-10 h-10 rounded-full overflow-hidden bg-gray-600" />
                    </div>

                    <!-- body -->
                    <div class="flex flex-col">
                        <!-- header -->
                        <div class="flex items-center gap-2">
                            <span class="dark:text-white font-bold">{{ conn.recipient.name }}</span>
                            <span class="text-gray-500 w-min">{{ conn.recipient.username }}</span>
                            <span class="text-gray-500">.</span>
                            <span class="text-gray-500">{{ conn.latest_message_created_at }}</span>
                        </div>
                        <!-- message body -->
                        <div>
                            <span class="text-gray-500 line-clamp-1">
                                {{ conn.last_message }}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
    <!-- end list of messages -->
</template>

<script setup>
const emits = defineEmits(["on-chat-open"]);
const props = defineProps({
    connections: {
        type: Array,
        required: true,
        default: [],
    },
});
const handleChatOpen = (recipient) => {
    emits("on-chat-open", recipient);
};
</script>
