<template>
    <div class="flex flex-col h-screen">
        <div
            class="p-2 my-2 mx-auto large:mx-0 w-min hover:bg-blue-50 rounded-full dark:hover:bg-white/20"
            :class="defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <LogoTwitter />
                </div>
            </NuxtLink>
        </div>

        <div class="mt-2 space-y-3">
            <SidebarLeftTab active>
                <template #icon>
                    <HomeIcon class="w-7" />
                </template>
                <template #name> Home </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <HashtagIcon class="w-7" />
                </template>
                <template #name> Explore </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <BellIcon class="w-7" />
                </template>
                <template #name> Notification </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <EnvelopeIcon class="w-7" />
                </template>
                <template #name> Messages </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <DocumentTextIcon class="w-7" />
                </template>
                <template #name> Lists </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <BookmarkIcon class="w-7" />
                </template>
                <template #name> Bookmarks </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <UserIcon class="w-7" />
                </template>
                <template #name> Profile </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <EllipsisHorizontalCircleIcon class="w-7" />
                </template>
                <template #name> More </template>
            </SidebarLeftTab>
        </div>
    </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/24/solid";

import {
    HashtagIcon,
    BellIcon,
    BookmarkIcon,
    DocumentTextIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon,
    EnvelopeIcon,
} from "@heroicons/vue/24/outline";
const { defaultTransition } = useTailWindConfig();
</script>
