export default () => {
    const searchUsers = async (search) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/user/${search}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        searchUsers,
    };
};
