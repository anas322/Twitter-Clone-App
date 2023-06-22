<template>
    <div
        :class="[
            (props.modal === false && props.parent) || props.home || props.replies ? 'border-b' : '',
            themeMode === true ? 'border-white/20' : 'border-gray-200',
        ]"
    >
        <!-- if retweeted -->
        <div v-if="props.tweet.retweet_of != null && props.tweet.content == null" class="flex gap-x-1 pl-4">
            <ArrowPathRoundedSquareIcon class="w-6 h-6 p-1 stroke-2 text-gray-500" />

            <span>
                <span class="text-gray-500 text-xs font-bold hover:underline cursor-pointer">{{ retweetOfText }}</span>
            </span>
        </div>

        <div
            class="relative flex items-start space-x-3 pt-2"
            :class="[themeClass(), props.modal ? '' : 'px-3', { 'bg-white dark:bg-dim-900': props.parent }]"
            @click="navigateToTweet"
        >
            <span
                v-if="props.modal"
                class="absolute left-8 top-12 bottom-0 block mt-1 mx-auto w-[2px] bg-white/20"
            ></span>
            <div class="flex-shrink-0">
                <NuxtLink :to="`/profile/${username}`" v-if="tweet.user.profile.avatar">
                    <img
                        class="w-10 h-10 rounded-full object-cover"
                        :src="tweet.user.profile.avatar"
                        :alt="tweet.user.name"
                    />
                </NuxtLink>
                <UIDefaultAvatar v-else class="w-10 h-10 rounded-full overflow-hidden bg-gray-600" />
            </div>
            <div class="flex-1">
                <div class="relative flex flex-col">
                    <div class="absolute right-0 top-0" @click.stop.prevent="toggleList">
                        <EllipsisHorizontalIcon
                            class="h-8 w-8 p-1 font-bold text-gray-500 hover:text-dim-500 hover:bg-dim-500/20 cursor-pointer rounded-full"
                        />
                        <div v-if="showList">
                            <Teleport to="body">
                                <div class="z-10 fixed inset-0 bg-transparent" @click="toggleList"></div>
                            </Teleport>
                            <div class="z-20 absolute right-0 top-0 min-w-max">
                                <div
                                    class="space-y-2 rounded-lg bg-white dark:bg-dim-900 shadow-lg shadow-gray-500 dark:shadow-white/20 overflow-hidden"
                                >
                                    <div
                                        v-if="!isUserOwnsTweet"
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                        @click="toggleFollowTweetAuthor"
                                    >
                                        <div>
                                            <UserPlusIcon class="h-5 w-5 dark:text-white" />
                                        </div>
                                        <span class="dark:text-white text-sm font-semibold">{{ followText }}</span>
                                    </div>

                                    <div
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                        v-if="isUserOwnsTweet"
                                        @click="deleteTweetById"
                                    >
                                        <div>
                                            <TrashIcon class="h-5 w-5 text-red-600" />
                                        </div>
                                        <span class="text-red-600 text-sm font-semibold">Delete</span>
                                    </div>

                                    <div
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    >
                                        <div>
                                            <DocumentPlusIcon class="h-5 w-5 dark:text-white" />
                                        </div>
                                        <span class="dark:text-white text-sm font-semibold"
                                            >Add/remove {{ tweet.user.usernameWithAt }} from Lists</span
                                        >
                                    </div>

                                    <div
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    >
                                        <div>
                                            <CodeBracketIcon class="h-4 w-4 stroke-2 dark:text-white" />
                                        </div>
                                        <span class="dark:text-white text-sm font-semibold">Embed Tweet</span>
                                    </div>

                                    <div
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    >
                                        <div>
                                            <NoSymbolIcon class="h-4 w-4 stroke-2 dark:text-white" />
                                        </div>
                                        <span class="dark:text-white text-sm font-semibold"
                                            >Block {{ tweet.user.usernameWithAt }}</span
                                        >
                                    </div>

                                    <div
                                        class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    >
                                        <div>
                                            <FlagIcon class="h-4 w-4 stroke-2 dark:text-white" />
                                        </div>
                                        <span class="dark:text-white text-sm font-semibold">Report Tweet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TweetItemHeader
                        :user="tweet.user"
                        :created_at="tweet.created_at"
                        :reply_to="tweet.reply_to"
                        :modal="props.modal"
                        :parent="props.parent"
                    />

                    <!-- tweet body -->
                    <div>
                        <p
                            class="text-sm"
                            :class="[
                                themeMode === true ? 'text-white' : 'text-gray-800',
                                { 'pt-8 -ml-[50px]': props.parent },
                            ]"
                        >
                            {{ tweet.content }}
                        </p>

                        <div
                            class="mt-2"
                            :class="[props.parent ? '-ml-12' : '']"
                            v-if="tweet.media?.length > 0 && !props.carousel"
                        >
                            <div
                                class="grid gap-x-1 gap-y-1 rounded-2xl overflow-hidden"
                                :class="[
                                    { 'grid-cols-1 grid-rows-1': tweet.media.length == 1 },
                                    { 'grid-cols-2 grid-rows-1': tweet.media.length == 2 },
                                    { 'grid-cols-2 grid-rows-2': tweet.media.length > 2 },
                                ]"
                            >
                                <div
                                    v-for="(media, index) in tweet.media"
                                    :key="`media-${index}`"
                                    :class="[tweet.media.length > 2 && index == 1 ? 'row-span-2' : '']"
                                >
                                    <img
                                        v-if="media.type == 'image'"
                                        :src="media.url"
                                        :alt="tweet.content"
                                        class="w-auto object-cover cursor-pointer"
                                        :class="[
                                            themeMode === true ? 'border border-gray-700' : 'border border-gray-400',
                                            { 'max-h-[810px]': props.parent },
                                            { 'max-h-[510px]': !props.parent },
                                            tweet.media.length > 2 && index == 1 ? 'h-full' : '',
                                        ]"
                                        @click.stop.prevent="openMediaModal"
                                    />
                                    <video v-else width="340" height="240" controls>
                                        <source :src="tweet.media[0]?.url" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- retweeted tweet -->
                    <div v-if="props.tweet.retweet_of != null && props.tweet.content != null">
                        <NuxtLink :to="`/status/${props.tweet.retweet_of.id}`">
                            <div
                                class="relative flex flex-col items-start p-2 mt-2 rounded-lg border border-gray-200 dark:border-white/20"
                                :class="[themeClass(), { 'bg-white dark:bg-dim-900 -ml-[50px]': props.parent }]"
                            >
                                <div class="flex-shrink-0">
                                    <div class="flex items-center gap-x-2">
                                        <img
                                            v-if="props.tweet.retweet_of.user.profile.avatar"
                                            class="w-4 h-4 rounded-full object-cover"
                                            :src="props.tweet.retweet_of.user.profile.avatar"
                                            :alt="props.tweet.retweet_of.user.name"
                                        />
                                        <UIDefaultAvatar
                                            v-else
                                            class="w-4 h-4 rounded-full overflow-hidden bg-gray-600"
                                        />
                                        <TweetItemHeader
                                            :user="props.tweet.retweet_of.user"
                                            :created_at="props.tweet.retweet_of.created_at"
                                            :reply_to="props.tweet.retweet_of.reply_to"
                                            :modal="props.modal"
                                            :parent="props.parent"
                                            :retweet="true"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div class="relative flex flex-col">
                                        <!-- tweet body -->
                                        <div>
                                            <p
                                                class="text-sm"
                                                :class="[themeMode === true ? 'text-white' : 'text-gray-800']"
                                            >
                                                {{ props.tweet.retweet_of.content }}
                                            </p>

                                            <div
                                                class="mt-2"
                                                :class="[props.parent ? '-ml-12' : '']"
                                                v-if="props.tweet.retweet_of.media?.length > 0"
                                            >
                                                <div v-if="props.tweet.retweet_of.media[0]?.type == 'image'">
                                                    <div
                                                        v-for="(media, index) in props.tweet.retweet_of.media"
                                                        :key="`media-key${index}`"
                                                    >
                                                        <img
                                                            :src="media.url"
                                                            :alt="props.tweet.retweet_of.content"
                                                            class="w-auto object-cover rounded-2xl"
                                                            :class="[
                                                                themeMode === true
                                                                    ? 'border border-gray-700'
                                                                    : 'border border-gray-400',
                                                                { 'max-h-[810px]': props.parent },
                                                                { 'max-h-[510px]': !props.parent },
                                                            ]"
                                                        />
                                                    </div>
                                                </div>
                                                <video v-else width="340" height="240" controls>
                                                    <source
                                                        :src="props.tweet.retweet_of.media[0]?.url"
                                                        type="video/mp4"
                                                    />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>

                                        <div v-if="props.modal">
                                            <span class="block text-sm text-gray-500 pt-4"
                                                >Replying to
                                                <span class="text-dim-600 hover:underline cursor-pointer">{{
                                                    props.tweet.retweet_of.reply_to?.user?.usernameWithAt
                                                }}</span>
                                            </span>
                                        </div>

                                        <div>
                                            <span class="text-dim-500 text-sm">Show this thread</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>

                    <div v-if="props.modal">
                        <span class="block text-sm text-gray-500 pt-4"
                            >Replying to
                            <span class="text-dim-600 hover:underline cursor-pointer">{{ replyingToText }}</span>
                        </span>
                    </div>

                    <!-- end of retweeted tweet  -->

                    <TweetItemActions
                        v-if="!props.modal"
                        :tweet="tweet"
                        :parent="props.parent"
                        @on-commit-click="handleCommitClick"
                        @on-retweet-click="handleRetweetClick"
                        @on-retweet-click-modal="handleRetweetClickModal"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    EllipsisHorizontalIcon,
    UserPlusIcon,
    TrashIcon,
    CodeBracketIcon,
    NoSymbolIcon,
    DocumentPlusIcon,
    FlagIcon,
} from "@heroicons/vue/24/outline";

import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/20/solid";

const { user } = useAuth();
const { useThemeMode } = useTheme();
const { unfollowProfile, followProfile } = useProfile();
const { deleteTweet, createTweet, unretweetTweet } = useTweets();
const emitter = useEmitter();
const themeMode = useThemeMode().value;

const tweet = ref(props.tweet);
const username = tweet.value.user.username;

const showList = ref(false);

const props = defineProps({
    tweet: {
        type: Object,
        required: true,
    },
    parent: {
        type: Boolean,
        default: false,
    },
    modal: {
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
    carousel: {
        type: Boolean,
        default: false,
    },
});
onBeforeMount(() => {
    if (props.tweet.retweet_of != null && props.tweet.content == null) {
        tweet.value = props.tweet.retweet_of;
    } else {
        tweet.value = props.tweet;
    }
});
const isSamePath = () => {
    return useRoute().path === `/status/${tweet.value.id}`;
};

const navigateToTweet = () => {
    if (isSamePath() || props.modal) return;

    navigateTo({
        path: `/status/${tweet.value.id}`,
    });
};

const handleCommitClick = () => {
    if (props.tweet.retweet_of != null && props.tweet.content == null) {
        emitter.$emit("replyTo", props.tweet.retweet_of);
        return;
    }
    emitter.$emit("replyTo", props.tweet);
};

const handleRetweetClick = async (isRetweetedByAuthUser) => {
    if (isRetweetedByAuthUser) {
        try {
            if (props.tweet.retweet_of != null) {
                const data = await unretweetTweet(props.tweet.retweet_of.id);
                console.log(data);
            } else {
                const data = await unretweetTweet(props.tweet.id);
                console.log(data);
            }

            if (props.tweet.retweet_of != null) {
                emitter.$emit("deleteTweet", props.tweet.id);
            }
        } catch (error) {
            console.log(error);
        }
        return;
    }
    const formData = new FormData();

    if (props.tweet.retweet_of != null && props.tweet.content == null) {
        formData.append("retweet_of", props.tweet.retweet_of.id);
        try {
            const data = await createTweet(formData);
            emitter.$emit("newTweet", data.tweet);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        return;
    }

    formData.append("retweet_of", props.tweet.id);
    try {
        const data = await createTweet(formData);
        emitter.$emit("newTweet", data.tweet);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const handleRetweetClickModal = () => {
    if (props.tweet.retweet_of != null && props.tweet.content == null) {
        emitter.$emit("retweetModal", props.tweet.retweet_of);
        return;
    }
    emitter.$emit("retweetModal", props.tweet);
};

const themeClass = () => {
    if (!isSamePath() && props.modal === false) {
        return themeMode === true ? "cursor-pointer hover:bg-white/5" : "cursor-pointer hover:bg-gray-50 ";
    }
};

const followText = computed(() => {
    if (tweet.value.isUserFollowTweetAuthor) {
        return `Unfollow ${tweet.value.user.usernameWithAt}`;
    } else {
        return `Follow ${tweet.value.user.usernameWithAt}`;
    }
});
const replyingToText = computed(() => {
    if (props.tweet.retweet_of != null && props.tweet.content == null) {
        return props.tweet.retweet_of.user.usernameWithAt;
    }
    return props.tweet.user.usernameWithAt;
});

const retweetOfText = computed(() => {
    if (props.tweet.retweet_of == null) return;

    if (props.tweet.user?.id == user.value.id) {
        return "You Retweeted";
    }

    if (props.tweet.retweet_of) {
        return `${props.tweet.user.name} Retweeted`;
    }
});

const isUserOwnsTweet = computed(() => {
    return tweet.value.user.id === user.value.id;
});

const toggleList = () => {
    showList.value = !showList.value;
};

const openMediaModal = () => {
    emitter.$emit("openMediaModal", tweet.value);
};

const toggleFollowTweetAuthor = async () => {
    try {
        if (tweet.value.isUserFollowTweetAuthor) {
            tweet.value.isUserFollowTweetAuthor = false;
            await unfollowProfile(username);
        } else {
            tweet.value.isUserFollowTweetAuthor = true;
            await followProfile(username);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteTweetById = async () => {
    try {
        console.log(tweet.value);
        await deleteTweet(tweet.value.id);
        emitter.$emit("deleteTweet", tweet.value.id);
    } catch (error) {
        console.log(error);
    }
};
</script>
