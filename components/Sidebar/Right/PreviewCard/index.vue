<template>
    <div class="mt-4 rounded-xl bg-dim-400 overflow-hidden dark:bg-dim-800">
        <div>
            <h1 class="p-3.5 font-extrabold dark:text-white">{{ props.title }}</h1>
        </div>

        <slot></slot>
        <div
            class="mt-3 p-3.5 text-dim-600 text-sm hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-700"
            :class="defaultTransition"
        >
            Show more
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});

const { defaultTransition } = useTailWindConfig();
</script>
