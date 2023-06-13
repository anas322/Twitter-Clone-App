export default () => {
    const usePostTweetModal = () => useState("post_tweet_modal", () => false);

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal();
        postTweetModal.value = false;
    };

    const openPostTweetModal = () => {
        const postTweetModal = usePostTweetModal();
        postTweetModal.value = true;
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

    return {
        getTweets,
        getSingleTweet,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
    };
};
