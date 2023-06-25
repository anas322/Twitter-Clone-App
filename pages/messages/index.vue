<template>
    <div :class="{ dark: darkMode }">
        <div class="min-h-full dark:bg-dim-900">
            <div class="grid grid-cols-12 mx-auto small:max-w-3xl meduim:max-w-6xl large:max-w-[1300px]">
                <!-- start left sidebar -->
                <div class="hidden small:block mx-auto col-span-2 meduim:col-span-1 large:col-span-2">
                    <div class="sticky top-0">
                        <SidebarLeft @on-tweet="handleModalOpen" />
                    </div>
                </div>
                <!-- end left sidebar -->

                <!-- start list of messages -->
                <div
                    class="border-x border-gray-200 col-span-12 small:col-span-10 meduim:col-span-4 dark:border-white/20"
                >
                    <!-- header -->
                    <div class="p-3">
                        <span class="font-semibold dark:text-white text-xl">Messages</span>
                    </div>
                    <div class="min-h-screen">
                        <div v-if="false" class="flex justify-center items-center h-24">
                            <UISpinner />
                        </div>

                        <article>
                            <div class="flex items-center p-3 gap-x-3 dark:hover:bg-white/10 transition">
                                <!-- image  -->
                                <div class="min-w-max">
                                    <img
                                        src="https://pbs.twimg.com/profile_images/1672352791531061248/g3F_iBqX_normal.jpg"
                                        alt=""
                                        class="w-12 h-12 rounded-full object-cover"
                                    />
                                </div>

                                <!-- body -->
                                <div class="flex flex-col">
                                    <!-- header -->
                                    <div class="flex items-center gap-2">
                                        <span class="dark:text-white font-bold">شهد</span>
                                        <span class="text-gray-500 w-min">@shahoooddd</span>
                                        <span class="text-gray-500">.</span>
                                        <span class="text-gray-500">Mar 11</span>
                                    </div>
                                    <!-- message body -->
                                    <div>
                                        <span class="text-gray-500 line-clamp-1">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero incidunt
                                            facere explicabo voluptatum, numquam, ipsum doloremque, facilis et aliquid
                                            excepturi qui adipisci exercitationem praesentium! Dolor tenetur ducimus
                                            obcaecati dolore veniam!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
                <!-- end list of messages -->

                <!-- start direct message box -->
                <div class="hidden pt-2 meduim:block small:col-span-6 meduim:col-span-6">
                    <div class="border-x border-gray-200 dark:border-white/20 relative">
                        <div v-if="false" class="flex justify-center items-center h-24">
                            <UISpinner />
                        </div>

                        <div class="relative h-screen flex flex-col justify-between">
                            <!-- header -->
                            <div
                                class="z-10 absolute left-0 right-0 top-0 backdrop-blur-md bg-[#ffffff78] dark:bg-[#ffffff05]"
                            >
                                <div class="p-2 flex items-center gap-x-6">
                                    <div>
                                        <ArrowSmallLeftIcon
                                            class="h-9 w-9 p-2 rounded-full transition hover:bg-white/20 dark:text-white"
                                        />
                                    </div>

                                    <div class="flex items-center gap-x-2">
                                        <div>
                                            <img
                                                src="https://pbs.twimg.com/profile_images/1672352791531061248/g3F_iBqX_normal.jpg"
                                                alt=""
                                                class="w-7 h-7 rounded-full object-cover"
                                            />
                                        </div>
                                        <span class="font-bold dark:text-white">شهد</span>
                                    </div>
                                </div>
                            </div>

                            <!-- messages -->
                            <div ref="messageContainer" class="overflow-y-auto grow">
                                <div class="p-3 min-h-full flex flex-col justify-end">
                                    <div class="grid justify-end gap-y-1">
                                        <div class="bg-dim-600 px-4 py-2 w-max rounded-full rounded-br-lg">
                                            <span class="text-white">لية مش فاهم</span>
                                        </div>
                                        <span class="text-xs text-gray-500">Mar 11, 2023, 6:26 AM</span>
                                    </div>

                                    <div class="grid justify-start gap-y-1">
                                        <div class="bg-gray-600 px-4 py-2 w-max rounded-full rounded-bl-lg">
                                            <span class="text-white">لية مش فاهم</span>
                                        </div>
                                        <span class="text-xs text-gray-500">Mar 11, 2023, 6:26 AM</span>
                                    </div>
                                </div>
                            </div>

                            <!-- send button -->
                            <div class="sticky bottom-0 left-0 px-3 py-2">
                                <div class="flex items-center gap-x-2 = p-1 bg-gray-600 rounded-3xl">
                                    <textarea
                                        class="hide-scrollbar order-2 w-full rounded-full px-2 py-2 text-white focus:outline-none focus:ring-0 bg-inherit border-none resize-none"
                                        placeholder="Start a new message"
                                        rows="1"
                                    ></textarea>

                                    <!-- ICONS -->
                                    <div class="order-1">
                                        <div class="flex items-center justify-between w-full py-1">
                                            <button
                                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                                            >
                                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                                    <g>
                                                        <path
                                                            d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
                                                        ></path>
                                                        <circle cx="8.868" cy="8.309" r="1.542"></circle>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button
                                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                                            >
                                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                                    <g>
                                                        <path
                                                            d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"
                                                        ></path>
                                                        <path
                                                            d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </button>

                                            <button
                                                class="text-xs font-bold text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                                            >
                                                <svg viewBox="0 0 24 24" class="w-4 h-4 stroke-2" fill="currentColor">
                                                    <g>
                                                        <path
                                                            d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                                                        ></path>
                                                        <path
                                                            d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"
                                                        ></path>
                                                        <circle cx="14.738" cy="9.458" r="1.478"></circle>
                                                        <circle cx="9.262" cy="9.458" r="1.478"></circle>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button class="order-3">
                                        <span>
                                            <PaperAirplaneIcon
                                                class="h-9 w-9 text-dim-600 p-2 rounded-full hover:bg-dim-300 focus:outline-none focus:ring-0"
                                            />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end direct message box -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { PaperAirplaneIcon, ArrowSmallLeftIcon } from "@heroicons/vue/24/outline";
definePageMeta({ middleware: ["auth"], layout: false });
useHead({
    title: "Messages / Twitter",
});

const messageContainer = ref(null);

onMounted(() => {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
});

const { openPostTweetModal } = useTweets();

const handleModalOpen = () => {
    openPostTweetModal();
};

const { useThemeMode } = useTheme();

const darkMode = useThemeMode();
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    width: 0.5em;
    background-color: transparent;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
