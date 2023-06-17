import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import "./aboutSettings.css";

export const AboutSettings = (props) => {
    // Utils
    const theme = useTheme().theme;

    return (
        <div className={`aboutSettings ${theme}`}>
            <div className="header">
                <h1>Pantra</h1>
                <p className="version">Version 0.0.34</p>
            </div>

            <div className="specialThanks">
                <h3 className="specialThanksTitle">Special Thanks</h3>
                <p className="specialThanksDescription">Amazing people who Pantra wouldn't exist without</p>

                <p title="Our hosting provider (for distribution/website)">DigitalOcean</p>

                <p className="specialThanksFooter">{"Made with ❤️ by SyntaxisCS"}</p>
            </div>
        </div>
    )
}