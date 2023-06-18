<template>
    <MainSection title="Home">
        <TweetForm @on-success="handleFormSuccess" />

        <div v-if="tweetsLoading" class="flex justify-center items-center h-24">
            <UISpinner />
        </div>

        <TweetListFeed v-else :tweets="tweets" home />
    </MainSection>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });

const { getTweets } = useTweets();
const emitter = useEmitter();

const tweets = ref([]);
const tweetsLoading = ref(true);

onBeforeMount(() => {
    getTweetsFun();
});

async function getTweetsFun() {
    try {
        const data = await getTweets();
        tweets.value = data.tweets;
    } catch (error) {
        console.log(error);
    } finally {
        tweetsLoading.value = false;
    }
}

emitter.$on("newTweet", (tweet) => {
    tweets.value.unshift(tweet);
});

const handleFormSuccess = (tweet) => {
    emitter.$emit("newTweet", tweet);
};
</script>
