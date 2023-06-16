<template>
    <TransitionGroup name="list">
        <TweetItem
            v-for="(tweet, index) in props.tweets"
            :key="tweet.id"
            :tweet="tweet"
            :parent="isLastItem(index)"
            :home="props.home"
            :replies="props.replies"
        />
    </TransitionGroup>
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
    home: {
        type: Boolean,
        default: false,
    },
    replies: {
        type: Boolean,
        default: false,
    },
});

function isLastItem(index) {
    return props.parent && index === props.tweets.length - 1;
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>
