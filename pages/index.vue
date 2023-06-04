<template>
    <div class="min-h-full">
        <div
            class="grid grid-cols-12 mx-auto small:max-w-2xl meduim:max-w-4xl meduim:gap-5 large:max-w-[1300px] large:gap-7"
        >
            <!-- start left sidebar -->
            <div class="hidden small:block col-span-2 meduim:col-span-1 large:col-span-2">
                <div class="sticky top-0">
                    <SidebarLeft />
                </div>
            </div>
            <!-- end left sidebar -->

            <!-- start main content -->
            <main
                class="border-x border-gray-200 col-span-12 small:col-span-10 meduim:col-span-7 large:col-span-6 dark:border-white/20"
            >
                <MainSection>
                    <TweetForm />
                </MainSection>
            </main>
            <!-- end main content -->

            <!-- start right sidebar -->
            <div class="hidden pt-2 meduim:block meduim:col-span-3">
                <div class="meduim:max-w-[360px] ml-auto">
                    <div class="sticky top-0">
                        <SidebarRight />
                    </div>
                </div>
            </div>
            <!-- end right sidebar -->
        </div>
    </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
const { user } = useAuth();
</script>
