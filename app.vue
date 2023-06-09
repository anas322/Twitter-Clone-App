<template>
    <div :class="{ dark: darkMode }">
        <div class="bg-white dark:bg-dim-900">
            <LoadingPage v-if="isLoading" />

            <div v-else>
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: "Home / Twitter",
    meta: [
        {
            name: "description",
            content: "Twitter is the best social media platform",
        },
    ],
    link: [
        {
            rel: "shortcut icon",
            href: "//abs.twimg.com/favicons/twitter.2.ico",
        },
    ],
});

const darkMode = ref(true);
const { useAuthLoading } = useAuth();
const isLoading = computed(() => useAuthLoading().value);
</script>
