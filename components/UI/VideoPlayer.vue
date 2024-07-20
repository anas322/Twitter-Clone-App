<template>
    <video v-intersect ref="videoPlayer" class="video-js vjs-theme-fantasy" controls></video>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import videojs from "video.js";

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    setup(props) {
        const videoPlayer = ref(null);
        let player = null;

        onMounted(() => {
            player = videojs(videoPlayer.value, { ...props.options, aspectRatio: "4:3", autoplay: false }, () => {
                player.log("onPlayerReady", this);
            });
        });

        onBeforeUnmount(() => {
            if (player) {
                player.dispose();
            }
        });

        return {
            videoPlayer,
        };
    },
};
</script>
