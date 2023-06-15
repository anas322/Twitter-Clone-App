<template>
    <div @click.stop.prevent="emits('onClick')" class="group flex items-center space-x-1">
        <div>
            <slot
                name="icon"
                :classes="[
                    props.parent ? `h-10 w-10` : `h-9 w-9`,
                    ` p-2 stroke-[2] text-gray-500 cursor-pointer rounded-full group-hover:text-${props.color}-500 group-hover:bg-${props.color}-500/20 transition duration-300`,
                ]"
            ></slot>
        </div>

        <span class="text-sm text-gray-500" :class="`group-hover:text-${props.color}-500`">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
const emits = defineEmits(["onClick"]);
const props = defineProps({
    color: {
        type: String,
        required: true,
    },
    parent: {
        type: Boolean,
        default: false,
    },
});
</script>
