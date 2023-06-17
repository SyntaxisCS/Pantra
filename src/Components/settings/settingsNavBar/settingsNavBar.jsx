import React from "react";
import { NavLink } from "react-router-dom";

// Utils
import {useTheme} from "../../../Utils/Themes/theme";
import "./settingsNavBar.css";

export const SettingsNavBar = (props) => {
    const theme = useTheme().theme;

    return (
        <div className={`settingsNavBar ${theme}`}>
            <NavLink to="/settings/general" className={({isActive}) => (isActive ? "active" : "none")}>General</NavLink>
            <NavLink to="/settings/theme" className={({isActive}) => (isActive ? "active" : "none")}>Theme</NavLink>
            {/*<NavLink to="/settings/privacy" className={({isActive}) => (isActive ? "active" : "none")}>Privacy</NavLink>*/}
            <NavLink to="/settings/about" className={({isActive}) => (isActive ? "active" : "none")}>About</NavLink>
        </div>
    )
}