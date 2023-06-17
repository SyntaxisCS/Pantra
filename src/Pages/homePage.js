import React from "react";
import { useNavigate } from "react-router";

// Utils
import "./Styles/homePage.css";
import { LocationCardList } from "../Components/homePage/LocationCardList/locationCardList";

export const HomePage = (props) => {
    // Utils
    const navigate = useNavigate();
    
    // Functions
    const handleSettingsClick = () => {
        navigate("/settings/theme");
    };

    return (
        <div className="homePage">
            <h1 className="logo">Pantra</h1>

            <div className="settingsButton" onClick={handleSettingsClick}>
                <i className="bx bx-cog"/><span>Settings</span>
            </div>

            <LocationCardList/>
        </div>
    )
}