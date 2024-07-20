export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("intersect", {
        mounted(el) {
            el.pause();
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            };

            const callback = (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting && !el.paused) {
                        el.dataset.pausedByObserver = "true";
                        el.pause();
                    }
                });
            };

            const observer = new IntersectionObserver(callback, options);
            observer.observe(el);

            el.addEventListener("play", () => {
                el.dataset.pausedByObserver = "false";
            });
        },
    });
});
