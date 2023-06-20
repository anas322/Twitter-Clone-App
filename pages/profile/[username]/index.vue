<template>
    <div>
        <MainSection withoutHeader profile :title="user.name" :tweetsCount="tweetsCount">
            <ProfileHeader />
            <ProfileTabs />

            <div v-if="tweetsLoading" class="flex justify-center items-center h-24">
                <UISpinner />
            </div>
            <div v-else>
                <TweetListFeed v-if="tweets.length > 0" :tweets="tweets" home />
                <div v-else class="flex justify-center items-center h-24">
                    <div class="text-gray-500">No Bananas founds 😢🍌</div>
                </div>
            </div>
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

onBeforeMount(() => {
    getUserTweetsFun();
});

const getUserTweetsFun = async () => {
    try {
        tweetsLoading.value = true;
        const data = await getUserTweets(username);
        tweets.value = data.tweets.filter((tweet) => !("reply_to" in tweet));
        tweetsCount.value = data.tweetsCount;
    } catch (error) {
        if (error.status == 404) {
            navigateTo("/profile/username/notfound", { replace: true });
        }
        console.log(error);
    } finally {
        tweetsLoading.value = false;
    }
};
</script>
