export default defineNuxtRouteMiddleware(async () => {
    const user = useUser();
    console.log("user", user);
    if (user.value) return navigateTo("/", { replace: true });
});
