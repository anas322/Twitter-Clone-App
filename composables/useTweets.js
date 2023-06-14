export default () => {
    const usePostTweetModal = () => useState("post_tweet_modal", () => false);
    const useReplyTweet = () => useState("reply_tweet", () => null);

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
        useReplyTweet,
    };
};
