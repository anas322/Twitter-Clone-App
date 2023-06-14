<template>
    <div :class="{ dark: darkMode }">
        <div class="bg-white dark:bg-dim-900">
            <LoadingPage v-if="isLoading" />

            <div v-else>
                <NuxtPage />
            </div>

            <UIDialog :isOpen="postTweetModal" @on-close="handleModalClose">
                <TweetItem v-if="replyTweet" :tweet="replyTweet" modal />
                <div class="pt-3"></div>
                <TweetForm @on-success="handleFormSucess" :reply_to="replyTweet?.id" modal />
            </UIDialog>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Home / Twitter",
    meta: [
        {
            name: "description",
            content: "Twitter is the best social media platform",
        },
    ],
    link: [
        {
            rel: "shortcut icon",
            href: "//abs.twimg.com/favicons/twitter.2.ico",
        },
    ],
});

const { closePostTweetModal, openPostTweetModal, usePostTweetModal, useReplyTweet } = useTweets();
const postTweetModal = usePostTweetModal();
const replyTweet = useReplyTweet();
const emitter = useEmitter();
emitter.$on("replyTo", (tweet) => {
    openPostTweetModal(tweet);
});

const { useThemeMode } = useTheme();
const darkMode = useThemeMode().value;
const { useAuthLoading } = useAuth();
const isLoading = computed(() => useAuthLoading().value);

const handleFormSucess = (tweet) => {
    // tweets.value.unshift(tweet);
    closePostTweetModal();
};

const handleModalClose = () => {
    closePostTweetModal();
};
</script>
