import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: "stylesheet", href: "https://unpkg.com/video.js@7/dist/video-js.min.css" },
                { rel: "stylesheet", href: "https://unpkg.com/@videojs/themes@1/dist/fantasy/index.css" },
            ],
        },
    },
    modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],
    runtimeConfig: {
        public: {
            backendUrl: process.env.NUXT_BACKEND_URL,
            frontendUrl: process.env.NUXT_FRONTEND_URL,
            pusherKey: process.env.NUXT_PUSHER_APP_KEY,
            pusherCluster: process.env.NUXT_PUSHER_APP_CLUSTER,
        },
    },
    imports: {
        dirs: ["./utils"],
    },
    build: {
        transpile: ["@headlessui/vue"],
    },
});
