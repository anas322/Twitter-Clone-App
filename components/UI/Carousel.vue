<template>
    <div class="flex w-full">
        <div class="relative w-full min-h-screen grid items-center">
            <carousel :items-to-show="1">
                <slide v-for="(media, index) in props.mediaFiles" :key="`mediaSlider-${index}`">
                    <div class="w-auto h-[75vh]">
                        <img class="object-cover w-full h-full" :src="media.url" :alt="media.name" />
                    </div>
                </slide>
                <template #addons>
                    <navigation />
                </template>
            </carousel>
            <ChevronDoubleRightIcon
                class="absolute top-4 right-4 h-9 w-9 p-2 bg-white/5 hover:bg-white/10 rounded-full transition text-white"
                @click="toggleShow"
            />

            <XMarkIcon
                class="absolute top-4 left-4 h-8 w-8 p-1 bg-white/5 hover:bg-white/10 rounded-full transition text-white"
                @click="emits('onClose')"
            />
        </div>
        <div v-show="showTweetSection" class="basis-3/12">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ChevronDoubleRightIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";

const emits = defineEmits(["onClose"]);
const props = defineProps({
    mediaFiles: {
        type: Array,
        default: [],
    },
});

const showTweetSection = ref(true);

const toggleShow = () => {
    showTweetSection.value = !showTweetSection.value;
};

onMounted(() => {
    if (window.innerWidth <= 512) {
        showTweetSection.value = false;
    }
});
</script>

<style>
button.carousel__next,
button.carousel__prev {
    background-color: rgb(255 255 255 / 0.05) !important;
    border-radius: 100% !important;
    width: 3rem !important;
    height: 3rem !important;
    transition: all 0.2s ease-in-out !important;
}

button.carousel__next:hover,
button.carousel__prev:hover {
    background-color: rgb(255 255 255 / 0.1) !important;
}
.carousel__icon {
    color: white !important;
}
</style>
