<template>
    <div>
        <div class="flex flex-row items-start space-x-2">
            <h1
                class="text-sm font-semibold hover:underline cursor-pointer"
                :class="themeMode === true ? 'text-white' : ''"
            >
                <NuxtLink :to="profileLink">
                    {{ props.user.name }}
                </NuxtLink>
            </h1>
            <NuxtLink :to="`/profile/${username}`" class="flex items-start">
                <span class="text-sm text-gray-500">{{ props.user.usernameWithAt }} </span>
            </NuxtLink>
            <span class="text-sm text-gray-500">.</span>
            <span class="text-sm text-gray-500">{{ props.created_at }}</span>
        </div>

        <div v-if="props.reply_to && !props.modal">
            <span class="block text-sm text-gray-500"
                >Replying to
                <NuxtLink :to="replyToProfileLink">
                    <span class="text-dim-600 hover:underline cursor-pointer">{{
                        props.reply_to?.user?.usernameWithAt
                    }}</span>
                </NuxtLink>
            </span>
        </div>
    </div>
</template>

<script setup>
const { useThemeMode } = useTheme();
const themeMode = useThemeMode().value;
const username = props.user.username;
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    created_at: {
        type: String,
        required: true,
    },
    reply_to: {
        type: Object,
        required: false,
    },
    modal: {
        type: Boolean,
        default: false,
    },
});

const profileLink = computed(() => {
    return `/profile/${username}`;
});
const replyToProfileLink = computed(() => {
    return `/profile/${props.reply_to?.user?.username}`;
});
</script>
