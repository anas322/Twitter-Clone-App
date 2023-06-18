export default () => {
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
    };
};
