import React from "react";

// Utils
import pantraLight from "../../../Assets/Images/pantraHorizontalLight.svg";
import pantraDark from "../../../Assets/Images/pantraHorizontalDark.svg";
import { useTheme } from "../../../Utils/Themes/theme";
import "./aboutSettings.css";

export const AboutSettings = (props) => {
    // Utils
    const theme = useTheme().theme;

    return (
        <div className={`aboutSettings ${theme}`}>
            <div className="header">
                <div className="logo"><img src={theme === "lightTheme" ? pantraLight : pantraDark}/></div>
                <p className="version">Version 0.1.6</p>
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