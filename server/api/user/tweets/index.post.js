export default defineEventHandler(async (event) => {
    const user = event.context.auth?.user || null;

    
    const response = await $fetch("api/user", {
        baseURL: backendUrl,
        headers: {
            accept: "application/json",
            "X-XSRF-TOKEN": token,
            referer: frontendUrl,
            cookie: event.node.req.headers.cookie,
        },
        credentials: "include", // Include cookies in the request
    });

    return user;
});
