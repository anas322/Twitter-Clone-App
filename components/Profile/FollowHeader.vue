<template>
    <div>
        <div class="relative">
            <!-- fixed header -->
            <div class="z-10 sticky top-0 dark:border-white/20 border-b border-gray-200">
                <div class="pt-2 backdrop-blur-md bg-[#ffffff78] dark:bg-[#ffffff05]">
                    <div class="flex gap-6">
                        <div>
                            <ArrowLeftIcon
                                class="h-9 w-9 p-2 dark:text-white rounded-full hover:bg-gray-50 dark:hover:bg-white/10"
                                @click="$router.back()"
                            />
                        </div>
                        <div>
                            <span class="dark:text-white text-xl font-semibold pl-4">{{ props.title }}</span>
                            <span class="block text-xs text-gray-500 pl-4">{{ props.miniTitle }}</span>
                        </div>
                    </div>

                    <div class="flex flex-row pt-5">
                        <NuxtLink
                            :to="followersLink"
                            class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/10"
                            replace
                        >
                            <span class="relative whitespace-nowrap" :class="[FollowersClasses]"
                                >Followers
                                <span
                                    v-if="active == 'followers'"
                                    class="absolute left-0 -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"
                                ></span>
                            </span>
                        </NuxtLink>

                        <NuxtLink
                            :to="followingLink"
                            class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20"
                            replace
                        >
                            <span class="relative" :class="[followingClasses]"
                                >Following
                                <span
                                    v-if="active == 'following'"
                                    class="absolute left-0 -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"
                                ></span>
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- content -->
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
    title: String,
    miniTitle: String,
});

const active = ref("");

onBeforeMount(() => {
    active.value = useRoute().path.indexOf("following") > -1 ? "following" : "followers";
});

const followersLink = computed(() => {
    return useRoute().path.replace("following", "followers");
});

const followingLink = computed(() => {
    return useRoute().path.replace("followers", "following");
});

const followingClasses = computed(() => {
    return active.value == "following" ? "font-semibold dark:text-white" : "font-normal text-sm text-gray-500 ";
});

const FollowersClasses = computed(() => {
    return active.value != "following" ? "font-semibold dark:text-white" : "font-normal text-sm text-gray-500 ";
});
</script>
