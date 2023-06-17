import React from "react";
import { useNavigate } from "react-router";

// Components
import { SettingsNavBar } from "../../Components/settings/settingsNavBar/settingsNavBar";
import {ThemeSelector} from "../../Components/settings/theme/themeSelector";

// Utils
import { useTheme } from "../../Utils/Themes/theme";
import "./Styles/themeSettings.css";

export const ThemeSettingsPage = (props) => {

    const theme = useTheme().theme;
    const navigate = useNavigate();

    const handleBackClick = (props) => {
        navigate("/");
    };

    return (
        <div className={`themeSettingsPage ${theme}`}>
            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Home</span>
            </div>

            <SettingsNavBar/>
            <ThemeSelector/>
        </div>
    )
}