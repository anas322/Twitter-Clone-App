<template>
    <div>
        <div class="flex flex-col">
            <!-- profile cover image and avatar -->
            <div>
                <div class="relative w-full h-48 bg-dim-700">
                    <img
                        v-if="bannerImagePreview"
                        :src="bannerImagePreview"
                        :alt="data.profile.user?.username"
                        class="w-full h-48 object-cover"
                    />
                    <input
                        type="file"
                        hidden
                        ref="bannerImage"
                        name="selectedBanner"
                        @change="handleBannerChange"
                        accept=".jpeg,.png,.jpg,.webp"
                    />
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div class="flex gap-x-4">
                            <CameraIcon
                                class="h-9 w-9 text-white p-2 bg-gray-800/50 rounded-full cursor-pointer hover:bg-gray-800/30 transition-all"
                                @click="() => $refs.bannerImage.click()"
                            />

                            <XMarkIcon
                                v-if="bannerImagePreview"
                                class="h-9 w-9 text-white p-2 bg-gray-800/50 rounded-full cursor-pointer hover:bg-gray-800/30 transition-all"
                                @click="handleRemoveBanner"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex justify-between -mt-16 pl-5">
                    <div class="relative">
                        <img
                            v-if="avatarImagePreview"
                            :src="avatarImagePreview"
                            :alt="data.profile.user?.name"
                            class="z-10 w-32 h-32 rounded-full border-4 border-black object-cover"
                        />
                        <UIDefaultAvatar
                            v-else
                            class="w-32 h-32 rounded-full overflow-hidden border-4 border-black bg-gray-600"
                        />
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <CameraIcon
                                class="h-9 w-9 text-white p-2 bg-gray-800/50 rounded-full cursor-pointer hover:bg-gray-800/30 transition-all"
                                @click="() => $refs?.avatarImage.click()"
                            />
                        </div>
                    </div>
                    <input
                        type="file"
                        hidden
                        ref="avatarImage"
                        name="selectedAvatar"
                        @change="handleAvatarChange"
                        accept=".jpeg,.png,.jpg,.webp"
                    />
                </div>
            </div>
            <div class="flex flex-col space-y-4 pt-4 pb-2">
                <div>
                    <div
                        class="relative flex flex-col w-full px-2 rounded-md border border-gray-700"
                        :class="{
                            ' border-2 border-red-600 ': data.errors.name,
                            'border-2 border-dim-600 ': !data.errors.name,
                        }"
                    >
                        <label for="name" :class="[data.profile.name ? 'text-dim-600' : 'text-gray-700']">Name</label>
                        <input
                            type="text"
                            id="name"
                            class="w-full p-0 text-white bg-inherit focus:outline-none focus:ring-0 border-none"
                            v-model.trim="data.profile.name"
                            data-name="nameLength"
                            @input="validateForm"
                        />
                        <span class="absolute right-2 top-2 text-gray-500 text-xs"
                            >{{ dataLength.nameLength }}/ 50</span
                        >
                    </div>
                    <span v-if="data.errors.name" class="text-red-600 text-sm pl-2">Name can’t be blank</span>
                </div>

                <div>
                    <div class="relative flex flex-col w-full px-2 rounded-md border border-gray-700">
                        <label for="bio" class="text-gray-700">bio</label>
                        <textarea
                            id="bio"
                            class="w-full p-0 text-white bg-inherit focus:outline-none focus:ring-0 border-none resize-none"
                            rows="3"
                            v-model.trim="data.profile.bio"
                            @input="validateForm"
                            data-name="bioLength"
                        ></textarea>
                        <span class="absolute right-2 top-2 text-gray-500 text-xs"
                            >{{ dataLength.bioLength }}/ 160</span
                        >
                    </div>
                </div>

                <div>
                    <div class="relative flex flex-col w-full px-2 rounded-md border border-gray-700">
                        <label for="location" class="text-gray-700">location</label>
                        <input
                            type="text"
                            id="location"
                            class="w-full p-0 text-white bg-inherit focus:outline-none focus:ring-0 border-none"
                            v-model.trim="data.profile.location"
                            data-name="locationLength"
                            @input="validateForm"
                        />
                        <span class="absolute right-2 top-2 text-gray-500 text-xs"
                            >{{ dataLength.locationLength }}/ 30</span
                        >
                    </div>
                </div>

                <div>
                    <button
                        class="bg-white px-3 py-1 rounded-full text-sm font-semibold float-right mr-4 disabled:opacity-50"
                        :disabled="!isValidated || updateLoading"
                        @click="handleFormSubmit"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CameraIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emits = defineEmits(["onSuccess"]);
const props = defineProps({
    profile: { Object, required: true },
});

const data = reactive({
    profile: props.profile,
    errors: {},
});
const updateLoading = ref(false);

const selectedBanner = ref(null);
const bannerImagePreview = ref(props.profile.banner || null);
const selectedAvatar = ref(null);
const avatarImagePreview = ref(props.profile?.avatar || null);

const dataLength = computed(() => {
    return {
        nameLength: data.profile.name?.length,
        bioLength: data.profile.bio?.length,
        locationLength: data.profile.location?.length,
    };
});

const handleValidateDataLength = (e) => {
    const name = e.target.dataset.name;
    if (name == "nameLength") {
        let maxLength = 50;
        data.profile.name = e.target.value.slice(0, maxLength);
    } else if (name == "bioLength") {
        let maxLength = 160;
        data.profile.bio = e.target.value.slice(0, maxLength);
    } else if (name == "locationLength") {
        let maxLength = 30;
        data.profile.location = e.target.value.slice(0, maxLength);
    }
};

//check if all fields are valid
const isValidated = computed(() => {
    return Object.values(data.errors).every((error) => !error);
});

//validate empty fields
const validateForm = (e) => {
    const errorsData = { name: false };
    if (!data.profile.name) {
        errorsData.name = true;
    }
    data.errors = errorsData;
    handleValidateDataLength(e);
};

const handleBannerChange = (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    selectedBanner.value = file;
    bannerImagePreview.value = URL.createObjectURL(file);
};

const handleAvatarChange = (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    selectedAvatar.value = file;
    avatarImagePreview.value = URL.createObjectURL(file);
};

const handleRemoveBanner = () => {
    selectedBanner.value = null;
    bannerImagePreview.value = null;
};

const handleFormSubmit = async () => {
    updateLoading.value = true;
    const formData = new FormData();

    formData.append("name", data.profile.name);
    if (data.profile.bio) {
        formData.append("bio", data.profile.bio);
    }

    if (data.profile.location) {
        formData.append("location", data.profile.location);
    }

    if (selectedBanner.value) {
        formData.append("banner", selectedBanner.value);
    }

    if (bannerImagePreview.value === null) {
        formData.append("bannerNull", null);
    }

    if (selectedAvatar.value) {
        formData.append("avatar", selectedAvatar.value);
    }
    try {
        await useFetchApi("/api/profile", { method: "POST", body: formData });

        emits("onSuccess");
    } catch (error) {
        console.log(error);
    } finally {
        updateLoading.value = false;
    }
};
</script>
