<template>
    <div
        :class="[
            (props.modal === false && props.parent) || props.home ? 'border-b' : '',
            themeMode === true ? 'border-white/20' : 'border-gray-200',
        ]"
    >
        <div
            class="relative flex items-start space-x-3 pt-2"
            :class="[themeClass(), props.modal ? '' : 'px-3']"
            @click="navigateToTweet"
        >
            <span
                v-if="props.modal"
                class="absolute left-8 top-12 bottom-0 block mt-1 mx-auto w-[2px] bg-white/20"
            ></span>
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
                        :modal="props.modal"
                    />

                    <!-- tweet body -->
                    <div>
                        <p class="text-sm" :class="[themeMode === true ? 'text-white' : 'text-gray-800']">
                            {{ props.tweet.content }}
                        </p>

                        <div class="mt-2" v-if="props.tweet.media?.length">
                            <img
                                :src="`http://localhost:8000/storage/tweets/${props.tweet.media[0]?.url}`"
                                alt=""
                                class="max-h-[510px] w-auto object-cover rounded-2xl"
                                :class="[themeMode === true ? 'border border-gray-700' : 'border border-gray-400']"
                            />
                        </div>
                    </div>

                    <div v-if="props.modal">
                        <span class="block text-sm text-gray-500 pt-4"
                            >Replying to
                            <span class="text-dim-600 hover:underline cursor-pointer">{{
                                props.tweet.reply_to?.user?.username
                            }}</span>
                        </span>
                    </div>

                    <TweetItemActions
                        v-if="!props.modal"
                        :tweet="tweet"
                        :parent="props.parent"
                        @on-commit-click="handleCommitClick"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
const { useThemeMode } = useTheme();
const emitter = useEmitter();

const themeMode = useThemeMode().value;
console.log(props.parent);
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
});

const isSamePath = () => {
    return useRoute().path === `/status/${props.tweet.id}`;
};

const navigateToTweet = () => {
    if (isSamePath() || props.modal) return;

    navigateTo({
        path: `/status/${props.tweet.id}`,
    });
};

const handleCommitClick = () => {
    emitter.$emit("replyTo", props.tweet);
};

const themeClass = () => {
    if (!isSamePath() && props.modal === false) {
        return themeMode === true ? "cursor-pointer hover:bg-white/5" : "cursor-pointer hover:bg-gray-50 ";
    }
};
</script>
