<template>
    <Messages>
        <div class="flex flex-col gap-y-2 max-w-sm mx-auto pt-96">
            <span class="text-4xl font-bold dark:text-white">Select a message</span>
            <span class="text-sm text-gray-500"
                >Choose from your existing conversations, start a new one, or just keep swimming.</span
            >
        </div>
    </Messages>
</template>

<script setup>
definePageMeta({ middleware: ["auth"], layout: false });
useHead({
    title: "Messages / Twitter",
});
</script>
