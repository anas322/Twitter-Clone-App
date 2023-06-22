<template>
    <div class="mt-2">
        <div v-if="props.parent" :class="props.parent ? '-ml-12' : ''">
            <div class="border-b border-gray-200 dark:border-white/20 py-3 text-gray-500 text-sm">
                <span
                    >{{ props.tweet.createed_at_full }} ·
                    <span class="font-semibold dark:text-white">59.9K</span> Views</span
                >
            </div>

            <div
                class="border-b border-gray-200 dark:border-white/20 py-3 text-gray-500 text-sm"
                v-if="isThereAnyReacts"
            >
                <span class="space-x-3">
                    <span v-if="props.tweet.retweets_without_quotes_count > 0"
                        ><span class="font-semibold dark:text-white">{{
                            props.tweet.retweets_without_quotes_count
                        }}</span>
                        Retweets
                    </span>
                    <span v-if="props.tweet.retweets_with_quotes_count > 0"
                        ><span class="font-semibold dark:text-white">{{ props.tweet.retweets_with_quotes_count }}</span>
                        Quotes
                    </span>
                    <span v-if="props.tweet.likes_count > 0"
                        ><span class="font-semibold dark:text-white">{{ likesCount }}</span> Likes
                    </span>
                    <span><span class="font-semibold dark:text-white">59</span> Bookmarks </span>
                </span>
            </div>
        </div>

        <div class="flex justify-between flex-row" :class="props.parent ? 'py-1 ml-[-30px] w-full' : 'max-w-[425px]'">
            <!-- comments -->
            <TweetItemActionsIcon color="dim" :parent="props.parent" @on-click="emits('onCommitClick')">
                <template #icon="{ classes }">
                    <ChatBubbleOvalLeftIcon :class="classes" />
                </template>

                <template #default v-if="!props.parent"> {{ repliesCount }} </template>
            </TweetItemActionsIcon>

            <TweetItemActionsIcon
                color="green"
                :parent="props.parent"
                :isRetweetedByAuthUser="props.tweet.isRetweetedByAuthUser"
                @click.stop.prevent="toggleList"
            >
                <template #icon="{ classes }">
                    <!-- retweet list -->
                    <div class="relative" v-if="showList">
                        <Teleport to="body">
                            <div class="z-10 fixed inset-0 bg-transparent" @click="toggleList"></div>
                        </Teleport>
                        <div class="z-20 absolute right-0 top-0 min-w-max">
                            <div
                                class="space-y-2 rounded-lg bg-white dark:bg-dim-900 shadow-lg shadow-gray-500 dark:shadow-white/20 overflow-hidden"
                            >
                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    @click.stop.prevent="handleRetweet"
                                >
                                    <div>
                                        <ArrowPathRoundedSquareIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">{{ retweetText }}</span>
                                </div>

                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                    @click.stop.prevent="handleRetweetModal"
                                >
                                    <div>
                                        <PencilSquareIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">Quote Tweet</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ArrowPathRoundedSquareIcon :class="classes" />
                </template>
                <template #default v-if="!props.parent">
                    {{ props.tweet.retweets_count == 0 ? "" : props.tweet.retweets_count }}
                </template>
            </TweetItemActionsIcon>

            <div class="group flex items-center space-x-1">
                <div @click.stop.prevent="handleTweetReact">
                    <UITwitterIcon :isLikedByAuthUser="props.tweet.isLikedByAuthUser" :parent="props.parent" />
                </div>
                <span
                    class="text-sm group-hover:text-[#f91880]"
                    :class="[props.tweet.isLikedByAuthUser ? 'text-[#f91880]' : 'text-gray-500']"
                    v-if="!props.parent"
                >
                    {{ likesCount == 0 ? "" : likesCount }}
                </span>
            </div>

            <TweetItemActionsIcon color="dim" :parent="props.parent" v-if="!props.parent">
                <template #icon="{ classes }">
                    <svg :class="classes" viewBox="0 0 24 24" aria-hidden="true" fill="CurrentColor">
                        <g>
                            <path
                                d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
                            ></path>
                        </g>
                    </svg>
                </template>
                <template #default v-if="!props.parent"> {{ Math.floor(Math.random() * 1000 + 1) }} </template>
            </TweetItemActionsIcon>

            <TweetItemActionsIcon color="dim" :parent="props.parent" v-if="props.parent">
                <template #icon="{ classes }">
                    <BookmarkIcon :class="classes" />
                </template>

                <template #default v-if="!props.parent"> {{ Math.floor(Math.random() * 100 + 1) }} </template>
            </TweetItemActionsIcon>

            <TweetItemActionsIcon color="dim" :parent="props.parent" @click.stop.prevent="toggleShareList">
                <template #icon="{ classes }">
                    <div class="relative" v-if="shareList">
                        <Teleport to="body">
                            <div class="z-10 fixed inset-0 bg-transparent" @click="toggleShareList"></div>
                        </Teleport>
                        <div class="z-20 absolute right-0 top-0 min-w-max">
                            <div
                                class="space-y-2 rounded-lg bg-white dark:bg-dim-900 shadow-lg shadow-gray-500 dark:shadow-white/20 overflow-hidden"
                            >
                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                >
                                    <div>
                                        <LinkIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">Copy link to Tweet</span>
                                </div>

                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                >
                                    <div>
                                        <ArrowUpTrayIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">Share Tweet via …</span>
                                </div>

                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                >
                                    <div>
                                        <EnvelopeIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">Send via Direct Message</span>
                                </div>

                                <div
                                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/5 transition-all"
                                >
                                    <div>
                                        <BookmarkIcon class="h-5 w-5 dark:text-white" />
                                    </div>
                                    <span class="dark:text-white text-sm font-semibold">Bookmark</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ArrowUpTrayIcon :class="classes" />
                </template>
            </TweetItemActionsIcon>
        </div>
    </div>
</template>

<script setup>
import {
    BookmarkIcon,
    EnvelopeIcon,
    LinkIcon,
    PencilSquareIcon,
    ChatBubbleOvalLeftIcon,
    ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";

import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/20/solid";

const emits = defineEmits(["onCommitClick", "onRetweetClick", "onRetweetClickModal"]);
const props = defineProps({
    tweet: {
        type: Object,
        required: true,
    },
    parent: {
        type: Boolean,
        default: false,
    },
});
const { likeTweet, unlikeTweet } = useTweets();
const showList = ref(false);
const shareList = ref(false);
const likesCount = ref(props.tweet.likes_count > 0 ? props.tweet.likes_count : "");
const repliesCount = computed(() => {
    return props.tweet.replies_count > 0 ? props.tweet.replies_count : "";
});

const retweetText = computed(() => {
    if (props.tweet.isRetweetedByAuthUser) {
        return "Undo Retweet";
    } else {
        return "Retweet";
    }
});

const toggleList = () => {
    showList.value = !showList.value;
};

const toggleShareList = () => {
    shareList.value = !shareList.value;
};
const isThereAnyReacts = computed(() => {
    return (
        props.tweet.likes_count > 0 ||
        props.tweet.retweets_without_quotes_count > 0 ||
        props.tweet.retweets_with_quotes_count > 0 ||
        props.tweet.retweets_with_quotes_count > 0
    );
});
const handleTweetReact = () => {
    if (props.tweet.isLikedByAuthUser) {
        likesCount.value--;
        props.tweet.isLikedByAuthUser = false;
        unlikeTweet(props.tweet.id);
    } else {
        likesCount.value++;
        props.tweet.isLikedByAuthUser = true;
        likeTweet(props.tweet.id);
    }
};
const handleRetweet = () => {
    showList.value = false;

    if (props.tweet.isRetweetedByAuthUser) {
        props.tweet.retweets_count--;
    } else {
        props.tweet.retweets_count++;
    }
    emits("onRetweetClick", props.tweet.isRetweetedByAuthUser);
};

const handleRetweetModal = () => {
    showList.value = false;
    emits("onRetweetClickModal");
};
</script>
