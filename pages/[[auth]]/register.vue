<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const { register } = useAuth();

const data = reactive({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const {
    submit,
    inProgress,
    validationErrors: errors,
} = useSubmit(() => register(data), {
    onSuccess: () => navigateTo("/"),
});
</script>

<template>
    <AuthCard>
        <template #logo>
            <NuxtLink href="/">
                <LogoTwitter class="w-20 h-20 fill-current" />
            </NuxtLink>
        </template>

        <form @submit.prevent="submit">
            <!-- Name -->
            <div>
                <Label for="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    class="block mt-1 w-full"
                    v-model="data.name"
                    :errors="errors.name"
                    autoFocus
                />
            </div>

            <!-- Username -->
            <div>
                <Label for="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    class="block mt-1 w-full"
                    v-model="data.username"
                    :errors="errors.username"
                    autoFocus
                />
            </div>

            <!-- Email Address -->
            <div class="mt-4">
                <Label for="email">Email</Label>
                <Input id="email" type="email" class="block mt-1 w-full" v-model="data.email" :errors="errors.email" />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    class="block mt-1 w-full"
                    v-model="data.password"
                    :errors="errors.password"
                    autoComplete="new-password"
                />
            </div>

            <!-- Confirm Password -->
            <div class="mt-4">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    class="block mt-1 w-full"
                    v-model="data.password_confirmation"
                    :errors="errors.password_confirmation"
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <NuxtLink href="/login" class="underline text-sm text-gray-600 hover:text-gray-900">
                    Already registered?
                </NuxtLink>

                <Button class="ml-3" :disabled="inProgress">Register</Button>
            </div>
        </form>
    </AuthCard>
</template>
