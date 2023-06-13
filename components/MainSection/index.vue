<template>
    <div class="relative">
        <!-- fixed header -->
        <div
            class="z-10 sticky top-0 dark:border-white/20"
            :class="{ 'border-b border-gray-200': !withoutHeader, 'pb-4 px-3': withoutHeader }"
        >
            <div class="pt-2 backdrop-blur-md bg-[#ffffff78] dark:bg-[#ffffff05]">
                <div class="flex gap-6">
                    <div v-if="withoutHeader">
                        <ArrowLeftIcon
                            class="h-9 w-9 p-2 dark:text-white rounded-full hover:bg-gray-50 dark:hover:bg-white/10"
                            @click="$router.back()"
                        />
                    </div>
                    <span class="dark:text-white text-2xl font-semibold pl-4">Home</span>
                </div>

                <div v-show="!withoutHeader" class="flex flex-row pt-5">
                    <div class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/10">
                        <span class="relative" :class="[forYouClasses]"
                            >For you
                            <span
                                v-if="!active"
                                class="absolute left-0 -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"
                            ></span>
                        </span>
                    </div>

                    <div class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20">
                        <span class="relative" :class="[followingClasses]"
                            >Following
                            <span
                                v-if="active"
                                class="absolute left-0 -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"
                            ></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- loading bar -->
        <div v-if="loading">
            <div class="flex justify-center items-center mt-4">
                <UISpinner />
            </div>
        </div>

        <!-- content -->
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const active = ref("following");
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    withoutHeader: {
        type: Boolean,
        default: false,
    },
});

const followingClasses = computed(() => {
    return active.value == "following" ? "font-semibold dark:text-white" : "font-normal text-sm text-gray-500 ";
});

const forYouClasses = computed(() => {
    return active.value != "following" ? "font-semibold dark:text-white" : "font-normal text-sm text-gray-500 ";
});
</script>
