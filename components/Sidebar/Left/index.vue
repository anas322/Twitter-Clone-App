<template>
    <div class="relative flex flex-col h-screen space-y-3">
        <div
            class="p-2 my-2 mx-auto large:mx-0 w-min hover:bg-blue-50 rounded-full dark:hover:bg-white/20"
            :class="defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <LogoTwitter />
                </div>
            </NuxtLink>
        </div>

        <div class="meduim:mx-auto large:mx-0 large:mt-2 large:space-y-3">
            <SidebarLeftTab to="/">
                <template #icon>
                    <div class="relative">
                        <HomeIconSolid v-if="activeRoute == 'home'" class="w-7" />
                        <HomeIcon v-else class="w-7" />
                    </div>
                </template>
                <template #name> Home </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <MagnifyingGlassIcon v-if="activeRoute !== 'explore'" class="w-7" />
                    <MagnifyingGlassIconSolid v-else class="w-7" />
                </template>
                <template #name> Explore </template>
            </SidebarLeftTab>

            <SidebarLeftTab to="/notifications">
                <template #icon>
                    <div class="relative">
                        <UIDot v-if="notificationCount">{{ notificationCount }}</UIDot>
                        <BellIconSolid v-if="activeRoute == 'notifications'" class="w-7" />
                        <BellIcon v-else class="w-7" />
                    </div>
                </template>
                <template #name> Notifications </template>
            </SidebarLeftTab>

            <SidebarLeftTab to="/messages">
                <template #icon>
                    <div class="relative">
                        <UIDot v-if="NotifyMssg" />
                        <EnvelopeIconSolid v-if="activeRoute == 'messages'" class="w-7" />
                        <EnvelopeIcon v-else class="w-7" />
                    </div>
                </template>
                <template #name> Messages </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <DocumentTextIcon class="w-7" />
                </template>
                <template #name> Lists </template>
            </SidebarLeftTab>

            <SidebarLeftTab to="/bookmarks">
                <template #icon>
                    <div class="relative">
                        <BookmarkIconSolid v-if="activeRoute == 'bookmarks'" class="w-7" />
                        <BookmarkIcon v-else class="w-7" />
                    </div>
                </template>
                <template #name> Bookmarks </template>
            </SidebarLeftTab>

            <SidebarLeftTab>
                <template #icon>
                    <CheckBadgeIcon class="w-7" />
                </template>
                <template #name> Verified </template>
            </SidebarLeftTab>

            <SidebarLeftTab :to="`/profile/${user?.username}`">
                <template #icon>
                    <UserIconSolid v-if="activeRoute == 'profile'" class="w-7" />
                    <UserIcon v-else class="w-7" />
                </template>
                <template #name> Profile </template>
            </SidebarLeftTab>

            <SidebarLeftTab moreIcon>
                <template #icon>
                    <EllipsisHorizontalCircleIcon class="w-7" />
                </template>
                <template #name> More </template>
            </SidebarLeftTab>
        </div>

        <!-- Tweet Button  -->
        <div @click="emits('onTweet')">
            <button
                class="hidden large:block px-16 py-3 text-center font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-0 transition duration-300"
            >
                Tweet
            </button>
            <div class="large:hidden flex justify-center">
                <button
                    class="px-3 py-3 w-min bg-dim-600 hover:bg-dim-500 rounded-full focus:outline-none focus:ring-0 transition duration-300"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 text-white" fill="CurrentColor">
                        <g>
                            <path
                                d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>

        <!-- user avatar and name,username  -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
            <div
                class="relative flex flex-row gap-2 p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full cursor-pointer"
                @click="handleDisplay"
            >
                <div class="w-10">
                    <img
                        v-if="user.profile?.avatar"
                        class="w-10 h-10 rounded-full object-cover"
                        :src="user.profile?.avatar"
                        :alt="user.name"
                    />
                    <UIDefaultAvatar v-else class="w-10 h-10 rounded-full overflow-hidden bg-gray-600" />
                </div>
                <div class="hidden large:flex flex-col pr-6">
                    <h1 class="text-sm dark:text-white font-semibold hover:underline cursor-pointer">
                        {{ user.name }}
                    </h1>
                    <span class="text-sm text-gray-500">{{ user.usernameWithAt }} </span>
                </div>

                <span class="hidden large:block absolute right-1 top-1/2 -translate-y-1/2"
                    ><EllipsisHorizontalIcon
                        class="h-8 w-8 p-1 font-bold text-gray-500 dark:text-gray-200 rounded-full"
                /></span>
            </div>

            <!-- logout dropdown -->
            <div v-if="toggleLogout" class="absolute -top-[130%] left-1/2 -translate-x-1/2">
                <div
                    class="relative space-y-2 rounded-lg overflow-hidden py-2 w-56 bg-white dark:bg-dim-900 shadow-lg shadow-gray-500 dark:shadow-white/10"
                >
                    <div class="p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10" @click="handleLogout">
                        <span class="dark:text-white font-medium whitespace-nowrap">Log out @{{ user.username }}</span>
                    </div>
                </div>
                <span
                    class="absolute -bottom-4 left-1/2 -translate-x-1/2 border-8"
                    style="border-color: black transparent transparent transparent"
                ></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    HomeIcon as HomeIconSolid,
    CheckBadgeIcon as CheckBadgeIconSolid,
    MagnifyingGlassIcon as MagnifyingGlassIconSolid,
    BellIcon as BellIconSolid,
    BookmarkIcon as BookmarkIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
    UserIcon as UserIconSolid,
    EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
    EnvelopeIcon as EnvelopeIconSolid,
    EllipsisHorizontalIcon as EllipsisHorizontalIconSolid,
} from "@heroicons/vue/24/solid";
import {
    HomeIcon,
    CheckBadgeIcon,
    MagnifyingGlassIcon,
    BellIcon,
    BookmarkIcon,
    DocumentTextIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon,
    EnvelopeIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/vue/24/outline";

const emits = defineEmits(["onTweet"]);
const { logout } = useAuth();
const emitter = useEmitter();

const { defaultTransition } = useTailWindConfig();
const { user } = useAuth();
const { useNotifyCount, NotificationIncrement } = useNotify();
const { useNotifyMssg, setNotifyMssgToTrue } = useMessage();

const toggleLogout = ref(false);
const notificationCount = useNotifyCount();
const NotifyMssg = useNotifyMssg();

emitter.$on("newNotificationUpdate", () => {
    NotificationIncrement();
});

emitter.$on("newMessageNotificationsUpdate", () => {
    setNotifyMssgToTrue();
});

const handleDisplay = () => {
    toggleLogout.value = !toggleLogout.value;
};

const handleLogout = () => {
    toggleLogout.value = false;
    logout();
};
const activeRoute = computed(() => {
    const route = useRoute().path;
    if (route === "/") return "home";
    if (route === "/explore") return "explore";
    if (route.indexOf("/notifications") >= 0) return "notifications";
    if (route.indexOf("/messages") >= 0) return "messages";
    if (route === "/bookmarks") return "bookmarks";
    if (route === "/lists") return "lists";
    if (route.indexOf("/profile") >= 0) return "profile";
    return "";
});
</script>
