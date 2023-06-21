export default () => {
    const usePostTweetModal = () => useState("post_tweet_modal", () => false);
    const useDisplayModal = () => useState("display_modal", () => false);
    const useReplyTweet = () => useState("reply_tweet", () => null);
    const useRetweetTweet = () => useState("retweet_tweet", () => null);
    const usePostRetweetModal = () => useState("post_retweet_modal", () => false);

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal();
        postTweetModal.value = false;
    };

    const setReplyTo = (tweet) => {
        const replyTweet = useReplyTweet();
        replyTweet.value = tweet;
    };

    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal();
        postTweetModal.value = true;

        setReplyTo(tweet);
    };

    const openDisplayModal = () => {
        const DisplayModal = useDisplayModal();
        DisplayModal.value = true;
    };
    const closeDisplayModal = () => {
        const DisplayModal = useDisplayModal();
        DisplayModal.value = false;
    };

    const setRetweetTo = (tweet) => {
        const retweetTweet = useRetweetTweet();
        retweetTweet.value = tweet;
    };

    const closePostRetweetModal = () => {
        const postRetweetModal = usePostRetweetModal();
        postRetweetModal.value = false;
    };

    const openPostRetweetModal = (tweet = null) => {
        const postRetweetModal = usePostRetweetModal();
        postRetweetModal.value = true;

        setRetweetTo(tweet);
    };

    const getTweets = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi("/api/tweets");
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const createTweet = async (formData = null) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi("/api/user/tweets", {
                    method: "POST",
                    body: formData,
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getSingleTweet = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${id}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getUserTweets = async (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/profile/tweets/${username}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const deleteTweet = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${id}`, {
                    method: "DELETE",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const likeTweet = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${id}/like`, {
                    method: "POST",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const unlikeTweet = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${id}/unlike`, {
                    method: "POST",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        getTweets,
        createTweet,
        getSingleTweet,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet,
        closeDisplayModal,
        openDisplayModal,
        useDisplayModal,
        getUserTweets,
        likeTweet,
        unlikeTweet,
        deleteTweet,
        usePostRetweetModal,
        closePostRetweetModal,
        openPostRetweetModal,
        useRetweetTweet,
    };
};
