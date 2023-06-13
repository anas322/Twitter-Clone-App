export default () => {
    const useThemeMode = () => useState("theme_mode", () => true);

    const toggleThemeMode = () => {
        const themeMode = useThemeMode();
        themeMode.value = themeMode.value === false ? true : false;
    };

    return {
        useThemeMode,
        toggleThemeMode,
    };
};
