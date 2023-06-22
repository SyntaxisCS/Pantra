import React from "react";

// Utils
import "./addListModal.css";
import { useTheme } from "../../../Utils/Themes/theme";

export const AddListModal = ({isOpen, onClose, onAddList}) => {
    // Utils
    const theme = useTheme().theme;

    // States
    const [selectedName, setSelectedName] = React.useState("");

    const [errorMessage, setErrorMessage] = React.useState("");

    // Functions
    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const checkInputs = () => {
        if (selectedName.trim() === "") {
            setErrorMessage("A name is required");
            return false;
        }

        setErrorMessage("");
        return true;
    };

    const handleAddList = () => {
        const inputsValid = checkInputs();

        if (inputsValid) {
            const newList = {
                name: selectedName,
            };

            onAddList(newList);
            resetFields();
        }
    };

    const resetFields = () => {
        // Reset all fields to default
        setSelectedName("");

        setErrorMessage("");
    };

    return (
        <div className={`addListModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Create list</h2>

                <label htmlFor="nameInput">Name</label>
                <input type="text" id="nameInput" value={selectedName} onChange={handleNameChange}/>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button onClick={handleAddList} className="addBtn">Create</button>
            </div>
        </div>
    )
}