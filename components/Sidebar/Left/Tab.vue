<template>
    <div>
        <NuxtLink
            to="/"
            class="flex items-center p-3 large:pr-6 w-min mx-auto meduim:mx-0 hover:bg-gray-200 rounded-full dark:text-white dark:hover:bg-white/20"
            :class="[defaultTransition]"
        >
            <div>
                <slot name="icon"></slot>
            </div>
            <div class="hidden large:block ml-4 text-lg" :class="[textClasses]">
                <slot name="name"></slot>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
const { defaultTransition } = useTailWindConfig();
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    to: {
        type: String,
        default: "/",
    },
});

const textClasses = computed(() => {
    return props.active ? "font-semibold" : "font-normal";
});
</script>
