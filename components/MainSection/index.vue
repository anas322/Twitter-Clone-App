<template>
    <div class="relative">
        <!-- fixed header -->
        <div class="sticky top-0 border-b border-gray-200">
            <div class="backdrop-blur-md bg-[#ffffff78] dark:bg-[#ffffff20]">
                <div><span class="dark:text-white text-xl font-bold pl-2 pt-2">Home</span></div>

                <div class="flex flex-row pt-5">
                    <div class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/10">
                        <span class="relative" :class="[forYouClasses]"
                            >For you
                            <span v-if="!active" class="absolute -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"></span>
                        </span>
                    </div>

                    <div class="w-1/2 py-3 px-28 hover:bg-gray-100 cursor-pointer dark:hover:bg-white/20">
                        <span class="relative" :class="[followingClasses]"
                            >Following
                            <span v-if="active" class="absolute -bottom-3.5 h-1 w-full rounded-sm bg-dim-600"></span>
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
const active = ref("following");
const props = defineProps({
    loading: {
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
