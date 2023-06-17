import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import "./themeSelector.css";

export const ThemeSelector = (props) => {
    // Utils
    const theme = useTheme();

    // Functions
    const handleThemeChange = (event) => {
        const selectedValue = event.target.value;

        switch(selectedValue) {
            case "lightTheme":
                theme.changeTheme("light");
            break;

            case "darkTheme":
                theme.changeTheme("dark");
            break;

            case "systemTheme":
                theme.changeTheme("system");
            break;

            default:
                theme.changeTheme("light");
            break;
        };
    };

    return (
        <div className={`themeSelector ${theme.theme}`}>
            <h1 className={`title ${theme.theme}`}>What Theme would you like for Pantra?</h1>
            <select value={theme.theme ? theme.theme : "lightTheme"} onChange={handleThemeChange}>
                <option value="lightTheme">Light</option>
                <option value="darkTheme">Dark</option>
                <option value="systemTheme">Follow System</option>
            </select>
        </div>
    )
};