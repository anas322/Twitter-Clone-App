<template>
    <TweetItem v-for="tweet in props.tweets" :key="tweet.id" :tweet="tweet" :parent="props.parent" />
</template>

<script setup>
const props = defineProps({
    tweets: {
        type: Array,
        required: true,
    },
    parent: {
        type: Boolean,
        default: false,
    },
});
</script>
