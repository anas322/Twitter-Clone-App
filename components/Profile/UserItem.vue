<template>
    <div>
        <NuxtLink :to="`${profileLink}`">
            <div class="p-3 flex justify-between hover:bg-white/5">
                <div class="flex items-start">
                    <div class="flex-shrink-0 mt-2">
                        <img
                            v-if="props.profile.user?.avatar"
                            class="h-11 w-11 rounded-full"
                            :src="props.profile.user?.avatar"
                            :alt="props.profile.user.name"
                        />
                        <UIDefaultAvatar v-else class="w-9 h-9 rounded-full overflow-hidden bg-gray-600" />
                    </div>
                    <div class="ml-2">
                        <div class="text-sm font-medium dark:text-white hover:underline">
                            {{ props.profile.user.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            {{ props.profile.user.usernameWithAt }}
                        </div>
                        <div class="" v-if="props.profile.bio">
                            <span class="dark:text-white">
                                {{ props.profile.bio }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-if="!isAuthUser">
                    <button
                        v-if="!props.profile.isAuthUserFollowThisProfile"
                        class="px-4 py-1 font-semibold rounded-full bg-black text-white hover:bg-black/80 dark:hover:bg-white/80 dark:text-black dark:bg-white transition-all"
                        :disabled="loading"
                        @click.stop.prevent="handleFollow"
                    >
                        Follow
                    </button>
                    <button
                        v-if="props.profile.isAuthUserFollowThisProfile"
                        class="px-3 py-1 border !border-gray-500 hover:!border-red-600 hover:!bg-red-600/20 hover:!text-red-600 font-semibold text-sm rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all dark:border-white dark:text-white"
                        :disabled="loading"
                        @mouseenter="handleMouseEnter"
                        @mouseleave="handleMouseLeave"
                        @click.stop.prevent="handleUnfollow"
                    >
                        {{ followingButtonText }}
                    </button>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const props = defineProps({
    profile: {
        type: Object,
        required: true,
    },
    currentUserProfile: {
        type: Object,
        required: true,
    },
});
const { unfollowProfile, followProfile } = useProfile();

const followingButtonText = ref("Following");
const loading = ref(false);
const profileLink = computed(() => {
    return `/profile/${props.profile.user.username}`;
});

const handleMouseEnter = () => {
    followingButtonText.value = "Unfollow";
};
const handleMouseLeave = () => {
    followingButtonText.value = "Following";
};

const handleFollow = async () => {
    try {
        loading.value = true;
        props.profile.isAuthUserFollowThisProfile = true;
        props.profile.followersCount++;
        await followProfile(username);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const handleUnfollow = async () => {
    try {
        loading.value = true;
        props.profile.isAuthUserFollowThisProfile = false;
        props.profile.followersCount--;
        await unfollowProfile(username);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const isAuthUser = computed(() => {
    return props.currentUserProfile.user.username === props.profile.user.username;
});
</script>
