<template>
    <div :class="{ dark: darkMode }">
        <div class="min-h-full dark:bg-dim-900">
            <div class="grid grid-cols-12 mx-auto small:max-w-3xl meduim:max-w-6xl large:max-w-[1300px]">
                <!-- start left sidebar -->
                <div class="hidden small:block mx-auto col-span-2 meduim:col-span-1 large:col-span-2">
                    <div class="sticky top-0">
                        <SidebarLeft @on-tweet="handleModalOpen" />
                    </div>
                </div>
                <!-- end left sidebar -->

                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>
const { openPostTweetModal } = useTweets();

const handleModalOpen = () => {
    openPostTweetModal();
};

const { useThemeMode } = useTheme();

const darkMode = useThemeMode();
</script>
