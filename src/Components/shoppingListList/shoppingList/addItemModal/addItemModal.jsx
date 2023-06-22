import React from "react";

// Utils
import { useTheme } from "../../../../Utils/Themes/theme";
import "./addItemModal.css";

export const addItemModal = ({isOpen, onClose, onAddItem}) => {
    // Utils
    const theme = useTheme().theme;

    // States
    const [selectedName, setSelectedName] = React.useState("");
    const [selectedBrand, setSelectedBrand] = React.useState("");
    const [selectedNumber, setSelectedNumber] = React.useState(0);

    const [errorMessage, setErrorMessage] = React.useState("");

    // Functions

    return (
        <div className={`addItemModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Add item to list</h2>

                <label htmlFor="nameInput">Name</label>
                <input type="text" id="nameInput"/>

                <label htmlFor="brandInput">Brand</label>
                <input type="text" id="brandInput"/>

                <label htmlFor="numberInput">Number</label>
                <input type="number" id="numberInput"/>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button onClick={} className="addBtn">Add</button>
            </div>
        </div>
    )
};
/*
        shopping list
        title : string
        items: []
        timesUsed: 0;
        lastUsed: date

        items:
        name:
        brand:
        number:
        checked: t/f
    */