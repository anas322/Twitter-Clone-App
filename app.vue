<template>
    <NuxtLayout>
        <div class="bg-white dark:bg-dim-900">
            <LoadingPage v-if="isLoading" />

            <div v-else>
                <NuxtPage />
            </div>

            <div v-if="mediaModal" class="z-50 fixed inset-0 bg-black/60">
                <UICarousel :mediaFiles="mediaTweet.media" @on-close="handleMediaModalClose">
                    <div class="min-h-screen overflow-y-auto bg-dim-900 border-l border-gray-200 dark:border-white/20">
                        <TweetItem :tweet="mediaTweet" carousel parent />
                        <TweetForm @on-success="handleFormCarouselSucess" :reply_to="mediaTweet?.id" />

                        <TweetListFeed :tweets="mediaTweet.replies" home />
                    </div>
                </UICarousel>
            </div>
            <!-- post tweet modal  -->
            <UIDialog :isOpen="postTweetModal" @on-close="handleModalClose">
                <TweetItem v-if="replyTweet" :tweet="replyTweet" modal />
                <div class="pt-3"></div>
                <TweetForm @on-success="handleFormSucess" :reply_to="replyTweet?.id" modal />
            </UIDialog>

            <!-- retweet modal  -->
            <UIDialog :isOpen="postRetweetModal" @on-close="handleRetweetModalClose">
                <TweetForm
                    @on-success="handleFormRetweetSucess"
                    :retweet_of="retweetTweet?.id"
                    :tweet="retweetTweet"
                    modal
                />
            </UIDialog>

            <UIDialog :isOpen="editProfiletModal" @on-close="handleProfileModalClose">
                <ProfileEditForm @on-success="handleProfileFormSucess" :profile="profile" />
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
    </NuxtLayout>
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
    closePostRetweetModal,
    usePostRetweetModal,
    openPostRetweetModal,
    closeMediaModal,
    useMediaModal,
    useMediaTweet,
    openMediaModal,
    openPostTweetModal,
    usePostTweetModal,
    useReplyTweet,
    openDisplayModal,
    useRetweetTweet,
} = useTweets();
const { useThemeMode, turnOnLightMode, turnOnDarkMode } = useTheme();
const darkMode = useThemeMode();
const { useEditProfileModal, closeEditProfileModal, openEditProfileModal, useProfileData } = useProfile();
const { useAuthLoading } = useAuth();
const emitter = useEmitter();

const postTweetModal = usePostTweetModal();
const postRetweetModal = usePostRetweetModal();
const displayModal = useDisplayModal();
const replyTweet = useReplyTweet();
const retweetTweet = useRetweetTweet();
const editProfiletModal = useEditProfileModal();
const profile = useProfileData();
const mediaModal = useMediaModal();
const mediaTweet = useMediaTweet();

const pickedMode = ref(darkMode.value ? "dark" : "default");
const isLoading = computed(() => useAuthLoading().value);

emitter.$on("replyTo", (tweet) => {
    openPostTweetModal(tweet);
});

emitter.$on("display", () => {
    openDisplayModal();
});

emitter.$on("retweetModal", (tweet) => {
    openPostRetweetModal(tweet);
});

emitter.$on("editProfile", (profile) => {
    openEditProfileModal(profile);
});

emitter.$on("openMediaModal", (tweet) => {
    openMediaModal(tweet);
});

emitter.$on("deleteTweet", () => {
    closeMediaModal();
});

const handleFormSucess = (tweet) => {
    emitter.$emit("newTweet", tweet);
    closePostTweetModal();
};

const handleFormCarouselSucess = (tweet) => {
    mediaTweet.value.replies.unshift(tweet);
};

const handleFormRetweetSucess = (tweet) => {
    emitter.$emit("newTweet", tweet);
    closePostRetweetModal();
};

const handleProfileFormSucess = () => {
    useRouter().go();
    closeEditProfileModal();
};

const handleModalClose = () => {
    closePostTweetModal();
};

const handleRetweetModalClose = () => {
    closePostRetweetModal();
};
const handleDisplayClose = () => {
    closeDisplayModal();
};

const handleMediaModalClose = () => {
    closeMediaModal();
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

const handleProfileModalClose = () => {
    closeEditProfileModal();
};
</script>
