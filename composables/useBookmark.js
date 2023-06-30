export default () => {
    const bookmarks = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi("/api/bookmarks");
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const bookmarkTweet = async (tweetId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${tweetId}/bookmark`, {
                    method: "POST",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    const unBookmarkTweet = async (tweetId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await useFetchApi(`/api/tweets/${tweetId}/unbookmark`, {
                    method: "POST",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        bookmarks,
        bookmarkTweet,
        unBookmarkTweet,
    };
};
