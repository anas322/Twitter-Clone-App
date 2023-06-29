export default () => {
    const useNotifyCount = () => useState("notificationCount", () => null);

    const NotificationIncrement = () => {
        const count = useNotifyCount();
        count.value = count.value + 1;
    };

    const setNotificationsToNull = () => {
        const count = useNotifyCount();
        count.value = null;
    };

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

    const readAllNotify = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi("/api/notifications", {
                    method: "POST",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return { Notifications, readAllNotify, useNotifyCount, NotificationIncrement, setNotificationsToNull };
};
