export default {
    darkMode: "class",

    theme: {
        screens: {
            xs: "614px",
            sm: "1002px",
            md: "1022px",
            lg: "1092px",
            xl: "1280px",
            small: "500px",
            meduim: "1004px",
            large: "1280px",
        },

        extend: {
            colors: {
                dim: {
                    50: "#5F99F7",
                    100: "#5F99F7",
                    200: "#38444d",
                    300: "#1d9bf01a",
                    400: "#F7F9F9",
                    500: "#1a8cd8",
                    600: "#1d9bf0",
                    700: "#1D1F23",
                    800: "#16181C",
                    900: "#000000",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
