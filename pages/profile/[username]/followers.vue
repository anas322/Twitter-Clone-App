<template>
    <div>
        <!-- loading bar -->
        <div v-if="loading" class="flex justify-center items-center mt-4">
            <UISpinner />
        </div>

        <div v-else>
            <ProfileFollowHeader :title="profileData.user?.name" :miniTitle="profileData.user?.username" />
            <ProfileUserItem
                v-for="(user, index) in followersUsers"
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
    title: `People following ${user.value.name} (@${user.value.username}) / Twitter`,
});

const { getUserProfile, ProfileFollowers } = useProfile();

const username = useRoute().params.username;

const followersUsers = ref([]);
const profileData = ref({});
const CurrentUserProfile = ref({});
const loading = ref(true);

onBeforeMount(() => {
    getProfileFollowers();
    getUserProfileFun();
    authencatedUserProfile();
});

const getProfileFollowers = async () => {
    try {
        const { followers } = await ProfileFollowers(username);
        followersUsers.value = followers;
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
