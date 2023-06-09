export default defineEventHandler((event) => {
    return { hello: "world" };

    // const { backendUrl, frontendUrl } = useRuntimeConfig().public;
    // const response = await $fetch("api/tweets", {
    //     baseURL: backendUrl,
    //     headers: {
    //         accept: "application/json",
    //         "X-XSRF-TOKEN": token,
    //         referer: frontendUrl,
    //         cookie: event.node.req.headers.cookie,
    //     },
    //     credentials: "include", // Include cookies in the request
    // });

    // return response;
});
