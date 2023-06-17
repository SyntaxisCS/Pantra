import React from "react";
import { useNavigate } from "react-router";

// Components
import { GeneralSettings } from "../../Components/settings/general/generalSettings";
import { SettingsNavBar } from "../../Components/settings/settingsNavBar/settingsNavBar";

// Utils
import { useTheme } from "../../Utils/Themes/theme";
import "./Styles/generalSettings.css";

export const GeneralSettingsPage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/");
    };

    return (
        <div className={`generalSettingsPage ${theme}`}>
            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Home</span>
            </div>

            <SettingsNavBar/>
            <GeneralSettings/>
        </div>
    )
}