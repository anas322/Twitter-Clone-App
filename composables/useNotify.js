export default () => {
    const Notifications = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/notifications`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return { Notifications };
};
