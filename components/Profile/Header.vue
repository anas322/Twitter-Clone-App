<template>
    <div>
        <div class="flex flex-col">
            <!-- profile cover image and avatar -->
            <div>
                <div class="w-full h-48 bg-dim-700">
                    <img
                        v-if="profileData.banner"
                        :src="profileData.banner"
                        :alt="profileData.user?.username"
                        class="w-full h-48 object-cover"
                    />
                </div>
                <div class="flex justify-between -mt-16 pl-5">
                    <img
                        v-if="profileData?.avatar"
                        :src="profileData?.avatar"
                        :alt="profileData.user?.name"
                        class="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover"
                    />
                    <UIDefaultAvatar
                        v-else
                        class="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-black bg-gray-600"
                    />
                    <div class="self-center mt-12 mr-4 flex gap-x-1">
                        <div v-if="!profileData.ownsProfile" @click="handleOpenChat">
                            <EnvelopeIcon
                                class="h-8 w-8 p-1.5 hover:bg-white/10 dark:text-white border border-white rounded-full"
                            />
                        </div>

                        <button
                            v-if="profileData.ownsProfile"
                            class="border !border-gray-500 px-3 py-1 font-semibold text-sm rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all dark:border-white dark:text-white"
                            @click="handleOpenEditProfileModal"
                        >
                            Edit profile
                        </button>

                        <div v-else>
                            <button
                                v-if="!profileData.isAuthUserFollowThisProfile"
                                class="px-4 py-1 font-semibold rounded-full bg-black text-white hover:bg-black/80 dark:hover:bg-white/80 dark:text-black dark:bg-white transition-all"
                                :disabled="loading"
                                @click="handleFollow"
                            >
                                Follow
                            </button>
                            <button
                                v-if="profileData.isAuthUserFollowThisProfile"
                                class="px-3 py-1 border !border-gray-500 hover:!border-red-600 hover:!bg-red-600/20 hover:!text-red-600 font-semibold text-sm rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all dark:border-white dark:text-white"
                                :disabled="loading"
                                @mouseenter="handleMouseEnter"
                                @mouseleave="handleMouseLeave"
                                @click="handleUnfollow"
                            >
                                {{ followingButtonText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!props.userNotFound" class="flex flex-col gap-y-4 p-3">
                <!-- name and username  -->
                <div class="flex flex-col justify-start">
                    <span class="text-lg font-bold dark:text-white">{{ profileData.user?.name }}</span>
                    <span class="text-gray-500 text-sm">{{ profileData.user?.usernameWithAt }}</span>
                </div>

                <!-- bio -->
                <div>
                    <span class="dark:text-white text-sm">
                        {{ profileData.bio != "null" ? profileData.bio : "" }}
                    </span>
                </div>

                <div class="flex gap-x-3">
                    <div v-if="profileData.location" class="flex items-center gap-1">
                        <MapPinIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-gray-500">{{ profileData.location }}</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <CalendarDaysIcon class="h-4 w-4 text-gray-500" />

                        <span class="text-gray-500">Joined {{ profileData.joined }}</span>
                    </div>
                </div>

                <!-- following and followers  -->
                <div class="flex gap-4">
                    <NuxtLink
                        :to="`/profile/${username}/following`"
                        class="flex items-center gap-1 hover:underline dark:hover:text-white cursor-pointer"
                    >
                        <span class="text-sm font-semibold dark:text-white">{{ profileData.followingCount }}</span>
                        <span class="text-gray-500 text-sm">Following</span>
                    </NuxtLink>

                    <NuxtLink
                        :to="`/profile/${username}/followers`"
                        class="flex items-center gap-1 hover:underline dark:hover:text-white cursor-pointer"
                    >
                        <span class="text-sm font-semibold dark:text-white">{{ profileData.followersCount }}</span>
                        <span class="text-gray-500 text-sm">Followers</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EnvelopeIcon, MapPinIcon, CalendarDaysIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    userNotFound: { Boolean, default: false },
});

const username = useRoute().params.username;
const { getUserProfile, unfollowProfile, followProfile } = useProfile();
const emitter = useEmitter();

const profileData = ref({});
const followingButtonText = ref("Following");
const loading = ref(false);
onBeforeMount(() => {
    getUserProfileFun();
});
const getUserProfileFun = async () => {
    try {
        const { profile } = await getUserProfile(username);
        profileData.value = profile;
    } catch (error) {
        console.log(error);
    }
};

const handleOpenEditProfileModal = () => {
    emitter.$emit("editProfile", {
        avatar: profileData.value?.avatar,
        banner: profileData.value.banner,
        bio: profileData.value.bio,
        location: profileData.value.location,
        name: profileData.value.user.name,
    });
};

const handleMouseEnter = () => {
    followingButtonText.value = "Unfollow";
};
const handleMouseLeave = () => {
    followingButtonText.value = "Following";
};

const handleFollow = async () => {
    try {
        loading.value = true;
        profileData.value.isAuthUserFollowThisProfile = true;
        profileData.value.followersCount++;
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
        profileData.value.isAuthUserFollowThisProfile = false;
        profileData.value.followersCount--;
        await unfollowProfile(username);
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
const handleOpenChat = () => {
    if (!profileData.value.user?.id) return;
    navigateTo("/messages");
    emitter.$emit("openChat", profileData.value.user);
};
</script>
