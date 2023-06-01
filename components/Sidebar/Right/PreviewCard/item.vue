<template>
    <div class="p-3.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-700" :class="defaultTransition">
        <slot></slot>
    </div>
</template>

<script setup>
const { defaultTransition } = useTailWindConfig();
</script>
