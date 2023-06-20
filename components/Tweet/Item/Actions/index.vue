<template>
    <div class="mt-2">
        <div v-if="props.parent" :class="props.parent ? '-ml-12' : ''">
            <div class="border-b border-gray-200 dark:border-white/20 py-3 text-gray-500 text-sm">
                <span
                    >{{ props.tweet.createed_at_full }} ·
                    <span class="font-semibold dark:text-white">59.9K</span> Views</span
                >
            </div>

            <div class="border-b border-gray-200 dark:border-white/20 py-3 text-gray-500 text-sm">
                <span class="space-x-3">
                    <span><span class="font-semibold dark:text-white">120</span> Retweets </span>
                    <span><span class="font-semibold dark:text-white">540</span> Quotes </span>
                    <span
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

            <TweetItemActionsIcon color="green" :parent="props.parent">
                <template #icon="{ classes }">
                    <ArrowPathRoundedSquareIcon :class="classes" />
                </template>
                <template #default v-if="!props.parent"> 5 </template>
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

            <TweetItemActionsIcon color="dim" :parent="props.parent">
                <template #icon="{ classes }">
                    <svg :class="classes" viewBox="0 0 24 24" aria-hidden="true" fill="CurrentColor">
                        <g>
                            <path
                                d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
                            ></path>
                        </g>
                    </svg>
                </template>
                <template #default v-if="!props.parent"> 5 </template>
            </TweetItemActionsIcon>

            <TweetItemActionsIcon color="dim" :parent="props.parent">
                <template #icon="{ classes }">
                    <ArrowUpTrayIcon :class="classes" />
                </template>
                <template #default v-if="!props.parent"> 5 </template>
            </TweetItemActionsIcon>
        </div>
    </div>
</template>

<script setup>
import { ChatBubbleOvalLeftIcon, ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import { ArrowPathRoundedSquareIcon } from "@heroicons/vue/20/solid";

const emits = defineEmits(["onCommitClick"]);
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

const repliesCount = computed(() => {
    return props.tweet.replies_count > 0 ? props.tweet.replies_count : "";
});

const likesCount = ref(props.tweet.likes_count > 0 ? props.tweet.likes_count : "");
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
</script>
