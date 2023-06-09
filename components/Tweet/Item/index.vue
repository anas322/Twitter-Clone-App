<template>
    <div class="border-b border-gray-200 dark:border-white/20">
        <div
            class="flex items-start space-x-3 pt-2 px-3"
            :class="{ 'cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5': !isSamePath() }"
            @click="navigateToTweet"
        >
            <div class="flex-shrink-0">
                <img
                    class="w-10 h-10 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1624685067577573378/ryXZhuCt_normal.jpg"
                    alt=""
                />
            </div>
            <div class="flex-1">
                <div class="relative flex flex-col">
                    <div class="absolute right-0 top-0">
                        <EllipsisHorizontalIcon
                            class="h-8 w-8 p-1 font-bold text-gray-500 hover:text-dim-500 hover:bg-dim-500/20 cursor-pointer rounded-full"
                        />
                    </div>

                    <TweetItemHeader
                        :user="props.tweet.user"
                        :created_at="props.tweet.created_at"
                        :reply_to="props.tweet.reply_to"
                    />

                    <!-- tweet body -->
                    <div>
                        <p class="text-sm text-gray-800 dark:text-white">{{ props.tweet.content }}</p>

                        <div class="mt-2" v-if="props.tweet.media?.length">
                            <img
                                :src="`http://localhost:8000/storage/tweets/${props.tweet.media[0]?.url}`"
                                alt=""
                                class="max-h-[510px] w-auto object-cover rounded-2xl border border-gray-400 dark:border-gray-700"
                            />
                        </div>
                    </div>

                    <TweetItemActions :tweet="tweet" :parent="props.parent" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
import { use } from "h3";

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

const isSamePath = () => {
    return useRoute().path === `/status/${props.tweet.id}`;
};

const navigateToTweet = () => {
    if (isSamePath()) return;

    navigateTo({
        path: `/status/${props.tweet.id}`,
    });
};
</script>
