<template>
    <div>
        <div class="flex flex-row items-start space-x-2">
            <h1 class="text-sm font-semibold hover:underline cursor-pointer dark:text-white">{{ props.user.name }}</h1>
            <span class="text-sm text-gray-500">{{ props.user.username }} </span>
            <span class="text-sm text-gray-500">.</span>
            <span class="text-sm text-gray-500">{{ props.created_at }}</span>
        </div>

        <div v-if="props.reply_to">
            <span class="block text-sm text-gray-500"
                >Replying to
                <span class="text-dim-600 hover:underline cursor-pointer">{{ props.reply_to?.user?.username }}</span>
            </span>
        </div>
    </div>
</template>

<script setup>
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
});
</script>
