import { $fetch, FetchError } from "ofetch";

const CSRF_COOKIE = "XSRF-TOKEN";
const CSRF_HEADER = "X-XSRF-TOKEN";

export async function useFetchApi(
    path,
    { redirectIfNotAuthenticated = true, redirectIfNotVerified = true, ...options } = {}
) {
    const { backendUrl, frontendUrl } = useRuntimeConfig().public;
    const router = useRouter();

    let token = useCookie(CSRF_COOKIE).value;

    // on client initiate a csrf request and get it from the cookie set by laravel
    if (process.client && ["post", "delete", "put", "patch"].includes(options?.method?.toLowerCase() ?? "")) {
        await initCsrf();
        // cannot use nuxt composables such as useCookie after an async operation:
        // https://github.com/nuxt/framework/issues/5238
        token = getCookie(CSRF_COOKIE);
    }

    let headers = {
        accept: "application/json",
        ...options?.headers,
        ...(token && { [CSRF_HEADER]: token }),
    };

    if (process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(["cookie"]),
            referer: frontendUrl,
        };
    }

    try {
        return new Promise((resolve, reject) => {
            try {
                const response = $fetch(path, {
                    baseURL: backendUrl,
                    ...options,
                    headers,
                    credentials: "include",
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    } catch (error) {
        if (!(error instanceof FetchError)) throw error;

        // when any of the following redirects occur and the final throw is not caught then nuxt SSR will log the following error:
        // [unhandledRejection] Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

        const status = error.response?.status ?? -1;

        if (redirectIfNotAuthenticated && [401, 419].includes(status)) {
            await router.push("/login");
        }

        if (redirectIfNotVerified && [409].includes(status)) {
            await router.push("/verify-email");
        }

        if ([500].includes(status)) {
            console.error("[Laravel Error]", error.data?.message, error.data);
        }
        throw error;
    }
}

async function initCsrf() {
    const { backendUrl } = useRuntimeConfig().public;

    await $fetch("/sanctum/csrf-cookie", {
        baseURL: backendUrl,
        credentials: "include",
    });
}

// https://github.com/axios/axios/blob/bdf493cf8b84eb3e3440e72d5725ba0f138e0451/lib/helpers/cookies.js
function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
    return match ? decodeURIComponent(match[3]) : null;
}
