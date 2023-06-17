import React from "react";
import {useNavigate, useParams} from "react-router";

// Utils
import "./Styles/locationItemPage.css";
import { useTheme } from "../Utils/Themes/theme";

// Components
import { ItemList } from "../Components/itemList/itemList";

export const LocationItemPage = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();
    const {id} = useParams();
    
    const handleBackClick = () => {
        navigate("/");
    }

    return (
        <div className="locationItemPage">
            <div className="backBtn" onClick={handleBackClick}>
                <i className="bx bx-arrow-back"/><span>Back</span>
            </div>
            <ItemList location={id ? id : "undefined"}/>
        </div>
    )
}