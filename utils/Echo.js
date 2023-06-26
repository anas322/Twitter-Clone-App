import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";

export default () => {
    const initEcho = () => {
        window.Pusher = Pusher;
        const { pusherKey, pusherCluster, backendUrl } = useRuntimeConfig().public;

        window.Echo = new Echo({
            broadcaster: "pusher",
            key: pusherKey,
            encrypted: true,
            cluster: pusherCluster,
            forceTLS: true,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        axios
                            .post(
                                `${backendUrl}/broadcasting/auth`,
                                {
                                    socket_id: socketId,
                                    channel_name: channel.name,
                                },
                                {
                                    withCredentials: true, // Add this line
                                }
                            )
                            .then((response) => {
                                console.log(response);
                                callback(null, response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                                callback(error);
                            });
                    },
                };
            },
        });
    };

    return {
        initEcho,
    };
};
