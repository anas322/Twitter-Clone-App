<template>
    <div>
        <!-- loading bar -->
        <div v-if="loading" class="flex justify-center items-center mt-4">
            <UISpinner />
        </div>

        <div v-else>
            <ProfileFollowHeader :title="profileData.user?.name" :miniTitle="profileData.user?.username" />
            <ProfileUserItem
                v-for="(user, index) in followingUsers"
                :key="`list-user${index}`"
                :profile="user.profile"
                :currentUserProfile="CurrentUserProfile"
            />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
const { user } = useAuth();
useHead({
    title: `People followed by ${user.value.name} (@${user.value.username}) / Twitter`,
});

const { getUserProfile, ProfileFollowing } = useProfile();

const username = useRoute().params.username;

const followingUsers = ref([]);
const profileData = ref({});
const CurrentUserProfile = ref({});
const loading = ref(true);

onBeforeMount(() => {
    getProfileFollowing();
    getUserProfileFun();
    authencatedUserProfile();
});

const getProfileFollowing = async () => {
    try {
        const { following } = await ProfileFollowing(username);
        followingUsers.value = following;
    } catch (error) {
        if (error.status == 404) {
            navigateTo("/profile/username/notfound");
        }
        console.log(error);
    }
};

const getUserProfileFun = async () => {
    try {
        const { profile } = await getUserProfile(username);
        profileData.value = profile;
    } catch (error) {
        console.log(error);
    }
};

const authencatedUserProfile = async () => {
    try {
        loading.value = true;
        const { profile } = await getUserProfile(user.value.username);
        CurrentUserProfile.value = profile;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>
