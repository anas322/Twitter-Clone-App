<script setup lang="ts">
definePageMeta({ middleware: ["guest"], layout: false });
const route = useRoute();
const { login } = useAuth();

const data = reactive({
    usernameOrEmail: "",
    password: "",
    remember: false,
});
const status = ref((route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : "");

const {
    submit,
    inProgress,
    validationErrors: errors,
} = useSubmit(
    () => {
        status.value = "";
        return login(data);
    },
    {
        onSuccess: () => navigateTo("/"),
    }
);
</script>

<template>
    <AuthCard>
        <template #logo>
            <NuxtLink to="/">
                <LogoTwitter class="w-20 h-20 fill-current" />
            </NuxtLink>
        </template>

        <!-- Session Status -->
        <AuthSessionStatus class="mb-4" :status="status" />

        <form @submit.prevent="submit">
            <!-- EmailOrUsername or username Address -->
            <div>
                <Label for="EmailOrUsername">Username or Email</Label>
                <Input
                    id="EmailOrUsername"
                    type="text"
                    class="block mt-1 w-full"
                    v-model="data.usernameOrEmail"
                    :errors="errors.username?.[0]"
                    autoFocus
                />
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
                    autoComplete="current-password"
                />
            </div>

            <!-- Remember Me -->
            <div class="block mt-4">
                <label for="remember" class="inline-flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        v-model="data.remember"
                    />
                    <span class="ml-2 text-sm text-gray-600"> Remember me </span>
                </label>
            </div>

            <NuxtLink href="/register" class="underline text-sm text-dim-600"> Don't have an account? </NuxtLink>
            <div class="flex items-center justify-end mt-4">
                <NuxtLink href="/forgot-password" class="underline text-sm text-gray-600 hover:text-gray-900">
                    Forgot your password?
                </NuxtLink>

                <Button class="ml-3" :disabled="inProgress">Login</Button>
            </div>
        </form>
    </AuthCard>
</template>
