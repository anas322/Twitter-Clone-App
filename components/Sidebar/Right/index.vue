<template>
    <div class="flex flex-col">
        <!-- serach bar -->
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
        <!-- preview card -->

        <SidebarRightPreviewCard title="What’s happening">
            <SidebarRightPreviewCardItem v-for="(whatHappening, index) in whatHappeningItems" :key="index">
                <span class="text-sm text-gray-500">{{ whatHappening.tag }}</span>
                <h2 class="font-bold dark:text-white">{{ whatHappening.title }}</h2>
                <span class="text-sm text-gray-500">{{ whatHappening.count }}</span>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
        <!-- preview card -->
        <SidebarRightPreviewCard title="Who to follow">
            <SidebarRightPreviewCardItem v-for="(WhoToFollow, index) in whoTsFollowItems" :key="index">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row items gap-3">
                        <img
                            class="w-10 h-10 rounded-full object-cover"
                            :src="WhoToFollow.avatar"
                            :alt="WhoToFollow.name"
                        />
                        <div>
                            <h2 class="font-bold dark:text-white hover:underline">{{ WhoToFollow.name }}</h2>
                            <span class="text-sm text-gray-500">{{ WhoToFollow.username }}</span>
                        </div>
                    </div>
                    <button
                        class="px-3.5 py-1 h-min text-sm rounded-2xl text-white font-semibold bg-dim-900 dark:bg-white dark:text-black"
                    >
                        <span> Follow </span>
                    </button>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <!-- footer -->
        <ul class="flex flex-wrap gap-x-2 pl-4 pt-3">
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#">Terms of Service</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#"> Privacy Policy</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#">Cookie Policy</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#">Accessibility</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#"> Ads info</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#"> More...</a></li>
            <li class="dark:text-gray-500 text-sm hover:underline"><a href="#"> © 2023 X Corp.</a></li>
        </ul>
    </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
const whatHappeningItems = ref([
    {
        tag: "Trending in Canada",
        title: "#SoftwareEngineering",
        count: "18.2k Tweets",
    },
    {
        tag: "Trending",
        title: "#SpaceX",
        count: "8.3k Tweets",
    },
    {
        tag: "Trending in Universe",
        title: "#Bannana Cat",
        count: "5.2k Tweets",
    },
]);

const whoTsFollowItems = ref([
    {
        name: "Elon Musk",
        username: "@elonmusk",
        avatar: "https://picsum.photos/200/200",
    },

    {
        name: "Elon Musk",
        username: "@elonmusk",
        avatar: "https://picsum.photos/200/200",
    },
]);

const search = ref("");
let outline = ref(false);

watch(search, (value) => {
    if (value.length > 0) {
        outline.value = true;
    } else {
        outline.value = false;
    }
});
</script>
