<template>
    <div class="mt-2">
        <div class="flex justify-between flex-row max-w-[425px]">
            <!-- comments -->
            <TweetItemActionsIcon color="dim">
                <template #icon="{ classes }">
                    <ChatBubbleOvalLeftIcon :class="classes" />
                </template>

                <template #default v-if="!props.parent"> {{ repliesCount }} </template>
            </TweetItemActionsIcon>

            <TweetItemActionsIcon color="green">
                <template #icon="{ classes }">
                    <ArrowPathRoundedSquareIcon :class="classes" />
                </template>
                <template #default v-if="!props.parent"> 5 </template>
            </TweetItemActionsIcon>

            <div class="flex items-center space-x-1">
                <UITwitterIcon />

                <span class="text-sm text-gray-500" v-if="!props.parent">5</span>
            </div>

            <TweetItemActionsIcon color="dim">
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

            <TweetItemActionsIcon color="dim">
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

const repliesCount = computed(() => {
    return props.tweet.replies_count > 0 ? props.tweet.replies_count : "";
});
</script>
