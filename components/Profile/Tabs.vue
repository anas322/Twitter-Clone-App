<template>
    <div class="border-b border-gray-200 dark:border-white/20">
        <div class="flex flex-row">
            <NuxtLink
                :to="`/profile/${username}`"
                class="py-3 basis-1/4 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/10"
            >
                <span
                    class="relative block text-center"
                    :class="{
                        'font-semibold text-black dark:text-white':
                            activeTab !== 'with_replies' && activeTab !== 'media' && activeTab !== 'likes',
                        'text-gray-500': activeTab === 'with_replies' || activeTab === 'media' || activeTab === 'likes',
                    }"
                    >Tweets
                    <span
                        v-if="activeTab !== 'with_replies' && activeTab !== 'media' && activeTab !== 'likes'"
                        class="absolute left-1/2 -translate-x-1/2 -bottom-2.5 h-1 w-14 rounded-sm bg-dim-600"
                    ></span>
                </span>
            </NuxtLink>

            <NuxtLink
                :to="`/profile/${username}/with_replies`"
                class="py-3 basis-1/4 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20"
            >
                <span
                    class="relative block text-center"
                    :class="{
                        'font-semibold text-black dark:text-white': activeTab === 'with_replies',
                        'text-gray-500': activeTab !== 'with_replies',
                    }"
                    >Replies
                    <span
                        v-if="activeTab === 'with_replies'"
                        class="absolute left-1/2 -translate-x-1/2 -bottom-2.5 h-1 w-14 rounded-sm bg-dim-600"
                    ></span>
                </span>
            </NuxtLink>

            <NuxtLink
                :to="`/profile/${username}/media`"
                class="py-3 basis-1/4 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20"
            >
                <span
                    class="relative block text-center"
                    :class="{
                        'font-semibold text-black dark:text-white': activeTab === 'media',
                        'text-gray-500': activeTab !== 'media',
                    }"
                    >Media
                    <span
                        v-if="activeTab === 'media'"
                        class="absolute left-1/2 -translate-x-1/2 -bottom-2.5 h-1 w-14 rounded-sm bg-dim-600"
                    ></span>
                </span>
            </NuxtLink>

            <NuxtLink
                :to="`/profile/${username}/likes`"
                class="py-3 basis-1/4 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20"
            >
                <span
                    class="relative block text-center"
                    :class="{
                        'font-semibold text-black dark:text-white': activeTab === 'likes',
                        'text-gray-500': activeTab !== 'likes',
                    }"
                    >Likes
                    <span
                        v-if="activeTab === 'likes'"
                        class="absolute left-1/2 -translate-x-1/2 -bottom-2.5 h-1 w-14 rounded-sm bg-dim-600"
                    ></span>
                </span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const username = useRoute().params.username;
const endUrl = useRoute().path.split("/");

const activeTab = endUrl[endUrl.length - 1];
</script>
