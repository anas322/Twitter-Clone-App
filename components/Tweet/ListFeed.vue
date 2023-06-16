<template>
    <TweetItem
        v-for="(tweet, index) in props.tweets"
        :key="tweet.id"
        :tweet="tweet"
        :parent="isLastItem(index)"
        :home="props.home"
        :replies="props.replies"
    />
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
