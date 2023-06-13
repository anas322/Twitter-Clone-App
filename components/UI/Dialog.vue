<template>
    <TransitionRoot appear :show="props.isOpen" as="template">
        <ClientOnly>
            <Dialog as="div" @close="closeModal" class="relative z-10">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto bg-blue-300/10">
                    <div class="flex min-h-full items-start justify-center p-4 text-center">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel
                                class="w-full max-w-xl mt-9 transform overflow-hidden rounded-2xl p-2 text-left align-middle shadow-xl transition-all"
                                :class="themeMode === true ? 'bg-dim-900' : 'bg-white'"
                            >
                                <div @click="closeModal">
                                    <XMarkIcon
                                        class="h-8 w-8 p-1.5 rounded-full transition-all duration-300"
                                        :class="
                                            themeMode === true ? 'text-white hover:bg-white/10' : 'hover:bg-black/5'
                                        "
                                    />
                                </div>
                                <slot></slot>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </ClientOnly>
    </TransitionRoot>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";

import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from "@headlessui/vue";

const emits = defineEmits(["onClose"]);
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
});

const { useThemeMode } = useTheme();
const themeMode = useThemeMode().value;

function closeModal() {
    emits("onClose");
}
</script>
