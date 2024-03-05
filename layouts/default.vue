<template>
    <div :class="{ dark: darkMode }">
        <div class="min-h-full dark:bg-dim-900" style="min-height: 100vh">
            <div
                class="meduim:px-4 grid grid-cols-12 mx-auto small:max-w-2xl meduim:max-w-5xl meduim:gap-5 large:max-w-[1300px] large:gap-7"
            >
                <!-- start left sidebar -->
                <div class="hidden small:block col-span-2 meduim:col-span-1 large:col-span-2">
                    <div class="sticky top-0">
                        <SidebarLeft @on-tweet="handleModalOpen" />
                    </div>
                </div>
                <!-- end left sidebar -->

                <!-- start main content -->
                <main
                    class="border-x border-gray-200 col-span-12 small:col-span-10 meduim:col-span-7 large:col-span-6 dark:border-white/20"
                >
                    <slot />
                </main>
                <!-- end main content -->

                <!-- start right sidebar -->
                <div class="hidden pt-2 meduim:block meduim:col-span-4">
                    <div class="meduim:max-w-[360px] ml-auto h-full">
                        <div class="sticky top-0">
                            <SidebarRight />
                        </div>
                    </div>
                </div>
                <!-- end right sidebar -->
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
