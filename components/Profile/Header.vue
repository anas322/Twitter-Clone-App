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
                <div class="flex justify-start -mt-16 pl-5">
                    <img
                        v-if="profileData.avatar"
                        :src="profileData.avatar"
                        :alt="profileData.user?.name"
                        class="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover"
                    />
                    <UIDefaultAvatar
                        v-else
                        class="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-black bg-gray-600"
                    />
                </div>
            </div>

            <div v-if="props.userNotFound" class="flex flex-col gap-y-4 p-3">
                <!-- name and username  -->
                <div class="flex flex-col justify-start">
                    <span class="text-lg font-bold dark:text-white">{{ profileData.user?.name }}</span>
                    <span class="text-gray-500 text-sm">{{ profileData.user?.username }}</span>
                </div>

                <!-- bio -->
                <div>
                    <span class="dark:text-white text-sm"> {{ profileData.bio }} </span>
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
                    <div class="flex items-center gap-1">
                        <span class="text-sm font-semibold dark:text-white">1,000</span>
                        <span class="text-gray-500 text-sm">Following</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <span class="text-sm font-semibold dark:text-white">1,000</span>
                        <span class="text-gray-500 text-sm">Followers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MapPinIcon } from "@heroicons/vue/24/outline";
import { CalendarDaysIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    userNotFound: { Boolean, default: false },
});

const username = useRoute().params.username;
const { getUserProfile } = useProfile();

const profileData = ref({});

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
</script>
