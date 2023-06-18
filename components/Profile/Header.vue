<template>
    <div>
        <div class="flex flex-col">
            <!-- profile cover image and avatar -->
            <div>
                <img
                    src="https://pbs.twimg.com/profile_banners/961791931025149953/1604313996/1500x500"
                    alt="profile cover image"
                    class="w-full h-48 object-cover"
                />

                <div class="flex justify-start -mt-16 pl-5">
                    <img
                        src="https://pbs.twimg.com/profile_images/1646501522166153216/9YZZp775_400x400.jpg"
                        alt="profile avatar"
                        class="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover"
                    />
                </div>
            </div>

            <div class="flex flex-col gap-y-4 p-3">
                <!-- name and username  -->
                <div class="flex flex-col justify-start">
                    <span class="text-lg font-bold dark:text-white">أنسْ 🏴🇵🇸𓂆</span>
                    <span class="text-gray-500 text-sm">@Anas0Dev</span>
                </div>

                <!-- bio -->
                <div>
                    <span class="dark:text-white text-sm"> Full Stack Developer, UI/UX Designer, and a student. </span>
                </div>

                <div class="flex gap-x-3">
                    <div class="flex items-center gap-1">
                        <MapPinIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-gray-500">Miami</span>
                    </div>

                    <div class="flex items-center gap-1">
                        <CalendarDaysIcon class="h-4 w-4 text-gray-500" />

                        <span class="text-gray-500">Joined April 2022</span>
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
</script>
