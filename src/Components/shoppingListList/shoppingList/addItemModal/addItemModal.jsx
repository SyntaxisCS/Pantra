import React from "react";

// Utils
import { useTheme } from "../../../../Utils/Themes/theme";
import "./addItemModal.css";

export const AddItemModal = ({isOpen, onClose, onAddItem}) => {
    // Utils
    const theme = useTheme().theme;

    // States
    const [selectedName, setSelectedName] = React.useState("");
    const [selectedBrand, setSelectedBrand] = React.useState("");
    const [selectedNumber, setSelectedNumber] = React.useState(0);

    const [errorMessage, setErrorMessage] = React.useState("");

    // Functions
    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleNumberChange = (event) => {
        setSelectedNumber(event.target.value);
    };

    const checkInputs = () => {
        if (selectedName.trim() === "") {
            setErrorMessage("A name is required");
            return false;
        }

        if (selectedNumber <= 0) {
            setErrorMessage("The number of items must be greater than 0");
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleAddItem = () => {
        const inputsValid = checkInputs();

        if (inputsValid) {
            const newItem = {
                name: selectedName,
                brand: selectedBrand !== "" ? selectedBrand : null,
                number: selectedNumber,
                checked: false
            }

            onAddItem(newItem);
            resetFields();
        }
    };

    const resetFields = () => {
        // Reset all fields to default
        setSelectedName("");
        setSelectedBrand("");
        setSelectedNumber(0);
        setErrorMessage("");
    };

    return (
        <div className={`addItemModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Add item to list</h2>

                <label htmlFor="nameInput">* Name</label>
                <input type="text" id="nameInput" value={selectedName} onChange={handleNameChange}/>

                <label htmlFor="brandInput">Brand</label>
                <input type="text" id="brandInput" value={selectedBrand} onChange={handleBrandChange}/>

                <label htmlFor="numberInput">* Number</label>
                <input type="number" id="numberInput" value={selectedNumber} onChange={handleNumberChange}/>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <p>Items with *'s are required</p>

                <button onClick={handleAddItem} className="addBtn">Add</button>
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