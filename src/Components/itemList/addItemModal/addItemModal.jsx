import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import "./addItemModal.css";

export const AddItemModal = ({isOpen, onClose, onAddItem}) => {
    // Utils
    const theme = useTheme().theme;

    // States
    const [selectedBrand, setSelectedBrand] = React.useState("");
    const [selectedName, setSelectedName] = React.useState("");
    const [selectedDescription, setSelectedDescription] = React.useState("");
    const [selectedExpiry, setSelectedExpiry] = React.useState("");
    const [selectedCount, setSelectedCount] = React.useState(0);

    // Functions
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    }

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleDescChange = (event) => {
        setSelectedDescription(event.target.value);
    };

    const handleExpiryChange = (event) => {
        setSelectedExpiry(event.target.value);
    };

    const handleCountChange = (event) => {
        setSelectedCount(event.target.value);
    };

    const handleAddItem = () => {
        const newItem = {
            brand: selectedBrand === "" ? null : selectedBrand,
            name: selectedName,
            description: selectedDescription === "" ? null : selectedDescription,
            expiry: selectedExpiry === "" ? null : selectedExpiry,
            count: 1,
            dateAdded: new Date()
        };

        onAddItem(newItem);
        resetFields();
    };

    const resetFields = () => {
        // Reset all fields to default
        setSelectedBrand("");
        setSelectedName("");
        setSelectedDescription("");
        setSelectedExpiry("");
        setSelectedCount(0);
    };

    return (
        <div className={`addItemModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Add Item</h2>

                <label htmlFor="brandInput">Brand</label>
                <input type="text" id="brandInput" value={selectedBrand} onChange={handleBrandChange} placeholder=""/>

                <label htmlFor="nameInput">* Name</label>
                <input type="text" id="nameInput" value={selectedName} onChange={handleNameChange} />

                <label htmlFor="descInput">Description</label>
                <input type="text" id="descInput" value={selectedDescription} onChange={handleDescChange} placeholder="(ex: 3rd shelf on right)"/>

                <label htmlFor="expiryInput">Expiration?</label>
                <input type="date" id="expiryInput" value={selectedExpiry} onChange={handleExpiryChange} placeholder=""/>

                <label htmlFor="countInput">* Quantity</label>
                <input type="number" id="countInput" defaultValue={1} onChange={handleCountChange} placeholder="how many items would you like to add?"/>

                <p>{"Items without *'s are not required"}</p>
                <button onClick={handleAddItem} className="addBtn">Add</button>
            </div>
        </div>
    )
}