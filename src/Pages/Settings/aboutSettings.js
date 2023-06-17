import React from "react";
import { useNavigate } from "react-router";

// Components
import { AboutSettings } from "../../Components/settings/about/aboutSettings";
import { SettingsNavBar } from "../../Components/settings/settingsNavBar/settingsNavBar";

// Utils
import { useTheme } from "../../Utils/Themes/theme";
import "./Styles/aboutSettings.css";

export const AboutSettingsPage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <div className={`aboutSettingsPage ${theme}`}>
            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Home</span>
            </div>

            <SettingsNavBar/>
            <AboutSettings/>
        </div>
    )
};