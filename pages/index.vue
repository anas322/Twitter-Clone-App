<template>
    <div class="min-h-full">
        <div
            class="grid grid-cols-12 mx-auto small:max-w-2xl meduim:max-w-4xl meduim:gap-5 large:max-w-[1300px] large:gap-7"
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
                <MainSection>
                    <TweetForm />

                    <div v-if="tweetsLoading" class="flex justify-center items-center h-24">
                        <UISpinner />
                    </div>

                    <TweetListFeed v-else :tweets="tweets" />
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
const { getTweets } = useTweets();
const { openPostTweetModal } = useTweets();

const tweets = ref([]);
const tweetsLoading = ref(true);

async function getTweetsFun() {
    try {
        const data = await getTweets();
        tweets.value = data.tweets;
    } catch (error) {
        console.log(error);
    } finally {
        tweetsLoading.value = false;
    }
}

onMounted(() => {
    getTweetsFun();
});

const handleModalOpen = () => {
    openPostTweetModal();
};
</script>
