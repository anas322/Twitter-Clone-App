<template>
    <div
        :class="[
            (props.modal === false && props.parent) || props.home || props.replies ? 'border-b' : '',
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
                <NuxtLink :to="`/profile/${username}`" v-if="props.tweet.user.profile.avatar">
                    <img
                        class="w-10 h-10 rounded-full object-cover"
                        :src="props.tweet.user.profile.avatar"
                        :alt="props.tweet.user.name"
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
                                            >Add/remove {{ props.tweet.user.usernameWithAt }} from Lists</span
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
                                            >Block {{ props.tweet.user.usernameWithAt }}</span
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

                        <div class="mt-2" :class="[props.parent ? '-ml-12' : '']" v-if="props.tweet.media?.length">
                            <img
                                :src="`http://localhost:8000/storage/tweets/${props.tweet.media[0]?.url}`"
                                alt=""
                                class="w-auto object-cover rounded-2xl"
                                :class="[
                                    themeMode === true ? 'border border-gray-700' : 'border border-gray-400',
                                    { 'max-h-[810px]': props.parent },
                                    { 'max-h-[510px]': !props.parent },
                                ]"
                            />
                        </div>
                    </div>

                    <div v-if="props.modal">
                        <span class="block text-sm text-gray-500 pt-4"
                            >Replying to
                            <span class="text-dim-600 hover:underline cursor-pointer">{{
                                props.tweet.reply_to?.user?.usernameWithAt
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
import { UserPlusIcon } from "@heroicons/vue/24/outline";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { CodeBracketIcon } from "@heroicons/vue/24/outline";
import { NoSymbolIcon } from "@heroicons/vue/24/outline";
import { DocumentPlusIcon } from "@heroicons/vue/24/outline";
import { FlagIcon } from "@heroicons/vue/24/outline";

const { user } = useAuth();
const { useThemeMode } = useTheme();
const { unfollowProfile, followProfile } = useProfile();
const { deleteTweet } = useTweets();
const emitter = useEmitter();
const themeMode = useThemeMode().value;

const username = props.tweet.user.username;
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

const followText = computed(() => {
    if (props.tweet.isUserFollowTweetAuthor) {
        return `Unfollow ${props.tweet.user.usernameWithAt}`;
    } else {
        return `Follow ${props.tweet.user.usernameWithAt}`;
    }
});

const isUserOwnsTweet = computed(() => {
    return props.tweet.user.id === user.value.id;
});

const toggleList = () => {
    showList.value = !showList.value;
};

const toggleFollowTweetAuthor = async () => {
    try {
        if (props.tweet.isUserFollowTweetAuthor) {
            props.tweet.isUserFollowTweetAuthor = false;
            await unfollowProfile(username);
        } else {
            props.tweet.isUserFollowTweetAuthor = true;
            await followProfile(username);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteTweetById = async () => {
    try {
        await deleteTweet(props.tweet.id);
        emitter.$emit("deleteTweet", props.tweet.id);
    } catch (error) {
        console.log(error);
    }
};
</script>
