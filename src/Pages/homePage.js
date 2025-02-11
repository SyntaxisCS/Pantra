import React from "react";

// Components
import { LocationCardList } from "../Components/homePage/LocationCardList/locationCardList";
import pantraLight from "../Assets/Images/pantraHorizontalLight.svg";
import pantraDark from "../Assets/Images/pantraHorizontalDark.svg";

// Utils
import { useNavigate } from "react-router";
import { useTheme } from "../Utils/Themes/theme";
import "./Styles/homePage.css";

export const HomePage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();
    
    // Functions
    const handleSettingsClick = () => {
        navigate("/settings/theme");
    };

    const handleShoppingClick = () => {
        navigate("/sl");
    }

    return (
        <div className={`homePage ${theme}`}>
            <div className="logo"><img src={theme === "lightTheme" ? pantraLight : pantraDark}/></div>

            <div className="settingsButton" onClick={handleSettingsClick}>
                <i className="bx bx-cog"/><span>Settings</span>
            </div>

            <div className="shoppingListButton" onClick={handleShoppingClick}>
                <button className="shopListBtn"><i className="bx bx-list-check"/>Shopping Lists</button>
            </div>

            <LocationCardList/>
        </div>
    )
}