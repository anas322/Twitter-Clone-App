<template>
    <video ref="videoPlayer" class="video-js vjs-theme-forest"></video>
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
            player = videojs(videoPlayer.value, { ...props.options, aspectRatio: "4:3" }, () => {
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
