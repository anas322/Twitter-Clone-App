import { sendError } from "h3";
import { $fetch } from "ofetch";
export default defineEventHandler(async (event) => {
    const { backendUrl, frontendUrl } = useRuntimeConfig().public;

    const endpoints = ["/api/user/tweets"];

    const isHandledByThisMiddleware = endpoints.some((endpoint) => event.node.req.url.startsWith(endpoint));

    if (!isHandledByThisMiddleware) {
        return;
    }

    // Initialize the CSRF token by making a request to /sanctum/csrf-cookie
    try {
        await $fetch("sanctum/csrf-cookie", {
            method: "GET",
            baseURL: backendUrl,
            credentials: "include", // Include cookies in the request
        });
    } catch (error) {
        console.log("sanctum/csrf-cookie error", error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal Server Error",
            })
        );
    }

    const token =
        event.node.req.headers.cookie
            ?.split(";")
            .map((cookie) => cookie.trim())
            .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
            ?.split("=")[1] || null;

    if (!token) {
        console.log("No token");
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            })
        );
    }

    // Log the request cookies
    try {
        // Call your Laravel Sanctum API to verify the token and retrieve the user
        // Replace the following line with your actual implementation

        const response = await $fetch("api/user", {
            baseURL: backendUrl,
            headers: {
                accept: "application/json",
                "X-XSRF-TOKEN": token,
                referer: frontendUrl,
            },
            credentials: "include", // Include cookies in the request
        });

        const user = await response;

        event.context.auth = { user };
    } catch (error) {
        console.log("api/user error", error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal Server Error",
            })
        );
    }
});
