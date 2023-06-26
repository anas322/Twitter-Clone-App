export default () => {
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

    const sendMessage = async (message, recipient_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/messages/${recipient_id}`, {
                    method: "POST",
                    body: {
                        message,
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
    };
};
