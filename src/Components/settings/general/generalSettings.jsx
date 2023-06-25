import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import { completeDataReset } from "../../../Utils/Storage/storage";
import "./generalSetting.css";

export const GeneralSettings = (props) => {
    // Utils
    const theme = useTheme().theme;

    const handleDataReset = async () => {
        console.info("Starting data reset... app will restart momentarily")
        await completeDataReset();
    };

    return (
        <div className={`generalSettings ${theme}`}>
            <h1 className="title">Settings</h1>

            <h3>Reset app data</h3>
            <p className="explanation">This will completely reset Pantra's data. This includes any locations, items, shopping lists, or selections you have made in settings. This action is irreversable. Pantra will close and open again automatically.</p>
            <button className="resetBtn" onClick={handleDataReset}>Reset!</button>
        </div>
    )
}