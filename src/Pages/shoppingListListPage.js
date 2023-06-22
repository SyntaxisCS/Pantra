import React from "react";

// Components
import pantraLight from "../Assets/Images/pantraHorizontalLight.svg";
import pantraDark from "../Assets/Images/pantraHorizontalDark.svg";
import { ShoppingListList } from "../Components/shoppingListList/shoppingListList";

// Utils
import { useNavigate } from "react-router";
import { useTheme } from "../Utils/Themes/theme";
import "./Styles/shoppingListListPage.css";

export const ShoppingListListPage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    // Functions
    const handleBackClick = () => {
        navigate("/");
    }

    return (
        <div className={`shoppingListListPage ${theme}`}>
            <div className="logo"><img src={theme === "lightTheme" ? pantraLight : pantraDark}/></div>

            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Back</span>
            </div>

            <ShoppingListList/>
        </div>
    )
}