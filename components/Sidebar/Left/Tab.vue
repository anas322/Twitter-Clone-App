<template>
    <div class="relative">
        <NuxtLink
            :to="props.to"
            class="flex items-center p-3 large:pr-6 w-min mx-auto meduim:mx-0 hover:bg-gray-200 rounded-full dark:text-white dark:hover:bg-white/20"
            :class="[defaultTransition]"
            @click="toggleMore"
        >
            <div>
                <slot name="icon"></slot>
            </div>
            <div class="hidden large:block ml-4 text-lg" :class="[textClasses]">
                <slot name="name"></slot>
            </div>
        </NuxtLink>
        <div v-if="moreIcon && toggleMoreOption" class="absolute inset-0">
            <div class="space-y-2 rounded-lg bg-white dark:bg-dim-900 shadow-lg shadow-gray-500 dark:shadow-white/20">
                <div
                    class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10"
                    @click="handleDisplay"
                >
                    <div>
                        <PaintBrushIcon class="h-5 w-5 dark:text-white" />
                    </div>
                    <span class="dark:text-white text-sm">Display</span>
                </div>

                <div class="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10">
                    <div>
                        <QuestionMarkCircleIcon class="h-5 w-5 dark:text-white" />
                    </div>
                    <span class="dark:text-white text-sm">Help Center</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PaintBrushIcon, QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";

const { defaultTransition } = useTailWindConfig();
const emitter = useEmitter();
const toggleMoreOption = ref(false);

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    to: {
        type: String,
        default: "/",
    },
    moreIcon: {
        type: Boolean,
        default: false,
    },
});

const textClasses = computed(() => {
    return props.active ? "font-semibold" : "font-normal";
});

const handleDisplay = () => {
    emitter.$emit("display");
    toggleMoreOption.value = false;
};

const toggleMore = () => {
    if (props.moreIcon) {
        toggleMoreOption.value = !toggleMoreOption.value;
    }
};
</script>
