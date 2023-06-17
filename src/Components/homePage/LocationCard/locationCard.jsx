const React = require("react");

// Components
import { useTheme } from "../../../Utils/Themes/theme";
import "./locationCard.css";

export const LocationCard = (props) => {
    const theme = useTheme().theme;

    return (
        <div className={`locationCard ${theme}`}>
            <i className={`bx ${props.icon ? props.icon : "icon"}`}/>
            <h1>{props.title ? props.title : "Title"}</h1>
            {props.description !== "" ? <p className="description">{props.description}</p> : <div/>}
        </div>
    )
};