import { useEffect, useState } from "react";

const useTheme = (theme: string) => {
    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        const body = document.body;
        if (theme === "light") {
            if (body.classList.contains("dark-theme")) {
                document.body.classList.remove("dark-theme");
                setCurrentTheme("light");
            }
            document.body.classList.add("light-theme");
        } else if (theme === "dark") {
            if (body.classList.contains("light-theme")) {
                document.body.classList.remove("light-theme");
                setCurrentTheme("dark");
            }
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.add("light-theme");
        }
    }, [theme])

    return [currentTheme, setCurrentTheme];

}

export default useTheme;