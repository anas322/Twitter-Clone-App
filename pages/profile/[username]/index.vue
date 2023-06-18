<template>
    <div>
        <MainSection withoutHeader profile :tweetsCount="tweetsCount">
            <ProfileHeader />
            <ProfileTabs />

            <div v-if="tweetsLoading" class="flex justify-center items-center h-24">
                <UISpinner />
            </div>
            <TweetListFeed v-else :tweets="tweets" home />
        </MainSection>
    </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });

const { user } = useAuth();
useHead({
    title: `(@${user.value.username}) / Twitter ${user.value.name}`,
});

const username = useRoute().params.username;
const tweets = ref([]);
const tweetsLoading = ref(true);
const tweetsCount = ref("");

const { getUserTweets } = useTweets();

onBeforeMount(async () => {
    getUserTweetsFun();
});

const getUserTweetsFun = async () => {
    try {
        tweetsLoading.value = true;
        const data = await getUserTweets(username);
        tweets.value = data.tweets.filter((tweet) => !("reply_to" in tweet));
        tweetsCount.value = data.tweetsCount;
    } catch (error) {
        console.log(error);
    } finally {
        tweetsLoading.value = false;
    }
};
</script>
