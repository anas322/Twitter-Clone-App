export default () => {
    const useThemeMode = () => useState("theme_mode", () => getTheCookie());

    const toggleThemeMode = () => {
        const themeMode = useThemeMode();
        themeMode.value = !themeMode.value;
    };

    const makeCookieForTheme = (mode) => {
        const cookie = useCookie("theme_mode");
        cookie.value = mode;
    };

    const getTheCookie = () => {
        const cookie = useCookie("theme_mode");
        return cookie.value || false;
    };

    const turnOnLightMode = () => {
        const themeMode = useThemeMode();
        themeMode.value = false;
        makeCookieForTheme(false);
    };

    const turnOnDarkMode = () => {
        const themeMode = useThemeMode();
        themeMode.value = true;
        makeCookieForTheme(true);
    };

    return {
        useThemeMode,
        toggleThemeMode,
        turnOnLightMode,
        turnOnDarkMode,
    };
};
