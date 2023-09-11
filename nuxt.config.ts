import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: "stylesheet", href: "https://unpkg.com/video.js@7/dist/video-js.min.css" },
                { rel: "stylesheet", href: "https://unpkg.com/@videojs/themes@1/dist/forest/index.css" },
            ],
        },
    },
    modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],
    runtimeConfig: {
        public: {
            backendUrl: "http://localhost:8000",
            frontendUrl: "http://localhost:3000",
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
