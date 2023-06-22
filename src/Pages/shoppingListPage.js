import React from "react";

// Components

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

    React.useEffect(() => {
        // do stuff. Minimums list id will be "minimums"
    }, []);

    return (
        <div className={`shoppingListPage ${theme}`}>
            <div className="logo"><img src={theme === "lightTheme" ? pantraLight : pantraDark}/></div>

            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Back</span>
            </div>
        </div>
    )
};