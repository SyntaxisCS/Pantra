import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import "./generalSetting.css";

export const GeneralSettings = (props) => {
    // Utils
    const theme = useTheme().theme;

    return (
        <div className={`generalSettings ${theme}`}>
            <h1 className="title">Settings</h1>

            <h3></h3>
        </div>
    )
}