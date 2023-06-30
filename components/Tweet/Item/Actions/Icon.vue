<template>
    <div @click.stop.prevent="emits('onClick')" class="group flex items-center space-x-1">
        <div>
            <slot
                name="icon"
                :classes="[
                    {
                        '!text-[#02bd7e]': props.isRetweetedByAuthUser && props.color === 'green',
                    },
                    props.parent ? `h-10 w-10` : `h-9 w-9`,
                    ` p-2 stroke-[2] text-gray-500 cursor-pointer rounded-full group-hover:text-${props.color}-500 group-hover:bg-${props.color}-500/20 transition duration-300`,
                ]"
            ></slot>
        </div>

        <span
            class="text-sm text-gray-500"
            :class="[
                `group-hover:text-${props.color}-500`,
                {
                    '!text-[#02bd7e]': props.isRetweetedByAuthUser && props.color == 'green',
                },
            ]"
        >
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
    isRetweetedByAuthUser: {
        type: Boolean,
        default: false,
    },
});

if (props.color == "green") console.log(props.isRetweetedByAuthUser);
</script>
