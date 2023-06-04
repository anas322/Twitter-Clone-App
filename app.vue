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
const darkMode = ref(true);
const { useAuthLoading } = useAuth();
const isLoading = computed(() => useAuthLoading().value);
</script>
