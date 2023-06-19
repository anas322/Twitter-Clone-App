export default () => {
    const useEditProfileModal = () => useState("edit_profile_modal", () => false);
    const useProfileData = () => useState("profile_data", () => null);

    const closeEditProfileModal = () => {
        const editprofileModal = useEditProfileModal();
        editprofileModal.value = false;
    };

    const openEditProfileModal = (profile = null) => {
        const editprofileModal = useEditProfileModal();
        editprofileModal.value = true;

        setProfile(profile);
    };

    const setProfile = (profile) => {
        const profileData = useProfileData();
        profileData.value = profile;
    };

    const getUserProfile = async (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/profile/${username}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        getUserProfile,
        useEditProfileModal,
        closeEditProfileModal,
        openEditProfileModal,
        useProfileData,
    };
};
