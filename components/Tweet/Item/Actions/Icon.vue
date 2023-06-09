<template>
    <div class="group flex items-center space-x-1">
        <div>
            <slot
                name="icon"
                :classes="`h-9 w-9 p-2 stroke-[2] text-gray-500 cursor-pointer rounded-full group-hover:text-${props.color}-500 group-hover:bg-${props.color}-500/20 transition duration-300`"
            ></slot>
        </div>

        <span class="text-sm text-gray-500" :class="`group-hover:text-${props.color}-500`">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    color: {
        type: String,
        required: true,
    },
});
</script>
