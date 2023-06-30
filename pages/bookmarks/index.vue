<template>
    <MainSection withoutHeader title="Bookmarks">
        <div v-if="loading" class="flex justify-center items-center h-24">
            <UISpinner />
        </div>

        <TweetListFeed v-else :tweets="tweets" />
    </MainSection>
</template>

<script setup>
const { bookmarks } = useBookmark();

const tweets = ref([]);
const loading = ref(false);

onMounted(async () => {
    await getBookmarks();
});

const getBookmarks = async () => {
    try {
        loading.value = true;
        const { bookmarksTweets } = await bookmarks();
        tweets.value = bookmarksTweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>
