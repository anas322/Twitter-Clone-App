<template>
    <div class="relative">
        <div
            class="flex flex-row gap-2 items-center border-none rounded-3xl overflow-hidden bg-dim-400 dark:bg-dim-700"
            :class="{ 'outline-dim-500 outline-1 outline-double': outline }"
        >
            <div class="pl-4">
                <MagnifyingGlassIcon class="w-6 h-6 p-[2px]" :class="outline ? 'text-dim-500' : 'text-gray-500'" />
            </div>
            <input
                type="text"
                class="w-full p-2 text-sm bg-inherit focus-within:outline-none border-0 focus:ring-0 focus:outline-none rounded-3xl dark:text-white"
                placeholder="Search for Banana 🍌"
                v-model="search"
            />
        </div>
        <div
            v-if="showList"
            class="dark:shadow-effect absolute top-10 left-0 w-96 py-4 rounded-lg bg-white dark:bg-dim-900"
        >
            <template v-if="usersArr.length > 0">
                <NuxtLink
                    :to="`/profile/${user.username}`"
                    v-for="user in usersArr"
                    :key="`search-user-${user.id}`"
                    @click="showList = false"
                >
                    <div class="py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10">
                        <div class="flex gap-x-2 items-start">
                            <div>
                                <img
                                    v-if="user.profile?.avatar"
                                    :src="user.profile?.avatar"
                                    :alt="user.name"
                                    class="w-10 h-10 rounded-full object-cover"
                                />
                                <UIDefaultAvatar v-else class="w-10 h-10 rounded-full overflow-hidden bg-gray-600" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm font-semibold dark:text-white">{{ user.name }}</span>
                                <span class="text-sm text-gray-500">{{ user.usernameWithAt }}</span>
                                <div
                                    v-if="user.isAuthUserFollowThisProfile && user.isThisProfileFollowAuthUser"
                                    class="flex gap-x-1 items-center mt-1 text-xs text-gray-500"
                                >
                                    <UserIcon class="w-3" />
                                    <span class="text-xs text-gray-500">You follow each other</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </template>
            <div v-else class="flex flex-col justify-center py-4">
                <span class="text-gray-500 text-lg text-center">Try search for Banana 🍌</span>
                <div v-if="loading">
                    <div class="flex justify-center items-center mt-4">
                        <UISpinner />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/solid";
const search = ref("");
let outline = ref(false);
const showList = ref(false);
const { searchUsers } = useSearch();

const usersArr = ref([]);
const loading = ref(false);

watch(search, (value) => {
    showList.value = value.length > 0;
    if (value.length > 0) {
        outline.value = true;
        getSearchUsers(search.value);
    } else {
        outline.value = false;
        usersArr.value = [];
    }
});

const getSearchUsers = async () => {
    try {
        loading.value = true;
        const { users } = await searchUsers(search.value);
        usersArr.value = users;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.shadow-effect {
    box-shadow: 0px 0px 33px -17px #fff;
}
</style>
