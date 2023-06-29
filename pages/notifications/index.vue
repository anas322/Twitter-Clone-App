<template>
    <div>
        <MainSection withoutHeader title="Notifications">
            <div v-if="loading" class="flex justify-center items-center h-24">
                <UISpinner />
            </div>
            <div v-else>
                <TransitionGroup name="list">
                    <div
                        v-for="(notify, index) in notificationsArr"
                        :key="`notify-${index}`"
                        class="flex justifiy-start dark:hover:bg-white/5 cursor-pointer border-b border-dim-500 dark:border-gray-700 transition duration-300"
                        :class="{
                            'px-6 py-3 gap-x-3': notify?.typeOFtweet != 'tweet',
                            'bg-white/5 hover:bg-white/10': !notify.read_at,
                        }"
                        @click="handleNotificationClick(notify)"
                    >
                        <div>
                            <UserIcon v-if="notify.typeOFtweet == 'follow'" class="h-8 w-8 text-dim-500" />
                            <HeartIcon v-if="notify.typeOFtweet == 'like'" class="h-8 w-8 text-[#f91880]" />
                            <ArrowPathRoundedSquareIcon
                                v-if="notify.typeOFtweet == 'retweet'"
                                class="h-8 w-8 text-[#02bd7e]"
                            />
                        </div>
                        <div
                            v-if="
                                notify.typeOFtweet == 'follow' ||
                                notify.typeOFtweet == 'like' ||
                                notify.typeOFtweet == 'retweet'
                            "
                            class="flex flex-col gap-y-2"
                        >
                            <div>
                                <img
                                    v-if="notify.tweet && notify.tweet?.user?.profile?.avatar"
                                    :src="notify.tweet && notify.tweet?.user?.profile?.avatar"
                                    :alt="notify.tweet?.user?.name"
                                    class="w-7 h-7 object-cover rounded-full"
                                />

                                <img
                                    v-else-if="notify.WhoMadeFollow && notify.WhoMadeFollow?.profile?.avatar"
                                    :src="notify.WhoMadeFollow && notify.WhoMadeFollow?.profile?.avatar"
                                    :alt="notify.WhoMadeFollow.name"
                                    class="w-7 h-7 object-cover rounded-full"
                                />
                                <UIDefaultAvatar v-else class="w-7 h-7 rounded-full overflow-hidden bg-gray-600" />
                            </div>
                            <div>
                                <template v-if="notify?.WhoMadeFollow">
                                    <span class="font-semibold dark:text-white">{{ notify.WhoMadeFollow.name }} </span>
                                    <span class="dark:text-white"> followed you </span>
                                </template>

                                <template v-else-if="notify.tweet">
                                    <span class="font-semibold dark:text-white">{{ notify.tweet.user.name }} </span>
                                    <span class="dark:text-white" v-if="notify.typeOFtweet == 'like'">
                                        Liked your tweet</span
                                    >
                                    <span class="dark:text-white" v-if="notify.typeOFtweet == 'retweet'">
                                        Retweeted your tweet</span
                                    >
                                </template>
                            </div>
                            <div>
                                <span
                                    class="text-gray-500"
                                    v-if="
                                        (notify.typeOFtweet == 'like' || notify.typeOFtweet == 'retweet') &&
                                        notify.tweet.content
                                    "
                                >
                                    {{ notify.tweet?.content }}
                                </span>
                            </div>
                        </div>
                        <div v-if="notify.typeOFtweet == 'tweet'" class="w-full">
                            <TweetItem :tweet="notify.tweet" />
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </MainSection>
    </div>
</template>

<script setup>
import { HeartIcon, ArrowPathRoundedSquareIcon, UserIcon } from "@heroicons/vue/24/solid";

definePageMeta({ middleware: ["auth"] });

useHead({
    title: "Notifications / Twitter",
});

const emitter = useEmitter();
const { Notifications, readAllNotify, setNotificationsToNull } = useNotify();

const loading = ref(true);
const notificationsArr = ref([]);

onBeforeUnmount(async () => {
    await readAllNotify();
    setNotificationsToNull();
});

onBeforeMount(() => {
    getNotifications();
});

const getNotifications = async () => {
    try {
        const { notifications } = await Notifications("/api/notifications");
        notificationsArr.value = notifications;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const handleNotificationClick = (notify) => {
    if (notify.typeOFtweet == "follow") {
        navigateTo(`/profile/${notify.WhoMadeFollow.username}`);
    } else if (notify.typeOFtweet == "like" || notify.typeOFtweet == "retweet") {
        navigateTo(`/status/${notify.tweet.id}`);
    }
};

emitter.$on("newNotification", (notify) => {
    notificationsArr.value.unshift(notify);
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>
