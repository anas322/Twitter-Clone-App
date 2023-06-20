<template>
    <MainSection withoutHeader title="Tweet">
        <div v-if="tweetsLoading" class="flex justify-center items-center h-24">
            <UISpinner />
        </div>
        <div v-else class="relative">
            <span
                v-if="tweet.length > 1"
                class="absolute left-8 top-12 bottom-44 block mt-1 mx-auto w-[2px] bg-white/20"
            ></span>
            <TweetListFeed :tweets="tweet" parent />
        </div>

        <TweetForm :reply_to="tweet[tweet.length - 1].id" @on-success="handleFormSuccess" />

        <TweetListFeed v-if="replies.length" :tweets="replies" replies />
    </MainSection>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
const { getSingleTweet } = useTweets();

const tweetsLoading = ref(false);
const tweet = ref([]);
const replies = ref([]);
const id = computed(() => {
    return useRoute().params.id;
});
try {
    tweetsLoading.value = true;

    const data = await getSingleTweet(id.value);

    tweet.value = flattenReplies(data.tweet);
    replies.value = data.tweet.replies;
} catch (error) {
    console.log(error);
} finally {
    tweetsLoading.value = false;
}

const handleFormSuccess = (tweet) => {
    replies.value.unshift(tweet);
};

function flattenReplies(tweet) {
    const flattenedReplies = [];

    function flatten(reply) {
        flattenedReplies.unshift(reply);

        if (reply.reply_to) {
            flatten(reply.reply_to);
        }
    }

    flatten(tweet);

    return flattenedReplies;
}
</script>
