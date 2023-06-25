<template>
    <div>
        <MainSection withoutHeader title="Notifications">
            <div v-if="false" class="flex justify-center items-center h-24">
                <UISpinner />
            </div>
            <div v-else>
                <div class="flex justifiy-start gap-x-3 px-6 py-2 dark:hover:bg-white/5 cursor-pointer">
                    <div>
                        <UserIcon class="h-7 w-7 text-dim-500" />
                        <!-- <HeartIcon class="h-7 w-7 text-[#f91880]" />
                        <ArrowPathRoundedSquareIcon class="h-7 w-7 text-[#02bd7e]" /> -->
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div>
                            <img
                                src="	https://pbs.twimg.com/profile_images/1307609139414138881/wWmcXtM8_normal.jpg"
                                alt=""
                                class="w-7 h-7 object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <span class="font-semibold dark:text-white">Shifa Afreen </span>
                            <span class="dark:text-white">followed you </span>
                        </div>
                        <div>
                            <span class="text-gray-500">خفف اجناب وحدد بس يعمنا</span>
                        </div>
                    </div>
                </div>
            </div>
        </MainSection>
    </div>
</template>

<script setup>
import { HeartIcon, ArrowPathRoundedSquareIcon, UserIcon } from "@heroicons/vue/24/solid";

definePageMeta({ middleware: ["auth"] });

useHead({
    title: "Notifications / Twitter",
});
</script>
