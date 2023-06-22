import React from "react";

// Components
import pantraLight from "../Assets/Images/pantraHorizontalLight.svg";
import pantraDark from "../Assets/Images/pantraHorizontalDark.svg";
import { ShoppingList } from "../Components/shoppingListList/shoppingList/shoppingList";

// Utils
import { useTheme } from "../Utils/Themes/theme";
import { useNavigate, useParams } from "react-router";
import "./Styles/shoppingListPage.css";

export const ShoppingListPage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();
    const {id} = useParams();

    // Functions
    const handleBackClick = () => {
        navigate("/sl");
    };

    return (
        <div className={`shoppingListPage ${theme}`}>
            <div className="logo"><img src={theme === "lightTheme" ? pantraLight : pantraDark}/></div>

            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Back</span>
            </div>

            <ShoppingList listId={id}/>
        </div>
    )
};