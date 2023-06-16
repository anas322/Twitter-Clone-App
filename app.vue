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

            <UIDialog :isOpen="displayModal" @on-close="handleDisplayClose">
                <span class="block text-2xl font-bold text-center" :class="[darkMode ? 'text-white' : 'text-black']"
                    >Customize your view</span
                >
                <span class="block text-gray-500 text-sm pb-2">Background</span>
                <div
                    class="flex justify-around p-2 rounded-xl"
                    :class="[pickedMode === 'default' ? 'bg-gray-200' : 'bg-dim-700']"
                >
                    <div
                        class="flex items-center rounded-md border-2 bg-white"
                        :class="{ 'border-dim-500': !darkMode }"
                        @click="SwitchToLightMode"
                    >
                        <input
                            id="light"
                            type="radio"
                            class="w-4 h-4 ml-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            value="default"
                            v-model="pickedMode"
                        />
                        <label for="light" class="w-full px-6 py-3 ml-2 font-medium">Default</label>
                    </div>

                    <div
                        class="flex items-center rounded-md border-2 bg-black"
                        :class="{ 'border-dim-500': darkMode }"
                        @click="SwitchToDarkMode"
                    >
                        <input
                            id="dark"
                            type="radio"
                            class="w-4 h-4 ml-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            value="dark"
                            v-model="pickedMode"
                        />
                        <label for="dark" class="w-full px-6 py-5 ml-2 font-medium text-white">Lights out</label>
                    </div>
                </div>
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

const {
    closeDisplayModal,
    useDisplayModal,
    closePostTweetModal,
    openPostTweetModal,
    usePostTweetModal,
    useReplyTweet,
    openDisplayModal,
} = useTweets();

const postTweetModal = usePostTweetModal();
const displayModal = useDisplayModal();
const replyTweet = useReplyTweet();
const emitter = useEmitter();
emitter.$on("replyTo", (tweet) => {
    openPostTweetModal(tweet);
});

emitter.$on("display", () => {
    openDisplayModal();
});

const { useThemeMode, turnOnLightMode, turnOnDarkMode } = useTheme();

const darkMode = useThemeMode();

const pickedMode = ref(darkMode.value ? "dark" : "default");
const { useAuthLoading } = useAuth();
const isLoading = computed(() => useAuthLoading().value);

const handleFormSucess = (tweet) => {
    // tweets.value.unshift(tweet);
    closePostTweetModal();
};

const handleModalClose = () => {
    closePostTweetModal();
};
const handleDisplayClose = () => {
    closeDisplayModal();
};

const SwitchToLightMode = () => {
    if (pickedMode.value === "default") return;
    turnOnLightMode();
    closeDisplayModal();
    useRouter().go();
};

const SwitchToDarkMode = () => {
    if (pickedMode.value === "dark") return;
    turnOnDarkMode();
    closeDisplayModal();
    useRouter().go();
};
</script>
