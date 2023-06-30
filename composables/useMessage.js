export default () => {
    const useNotifyMssg = () => useState("message_notify", () => false);

    const setNotifyMssgToTrue = () => {
        const notify = useNotifyMssg();
        notify.value = true;
    };

    const setNotifyMssgToFalse = () => {
        const notify = useNotifyMssg();
        notify.value = false;
    };

    const Connections = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/messages`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getSession = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/messages/${id}/session`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const ChatMessageCollection = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/messages/${id}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const sendMessage = async (message, recipient_id, session) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/messages/${recipient_id}`, {
                    method: "POST",
                    body: {
                        message,
                        session,
                    },
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        Connections,
        ChatMessageCollection,
        sendMessage,
        getSession,
        useNotifyMssg,
        setNotifyMssgToTrue,
        setNotifyMssgToFalse,
    };
};
