import React from "react";
import Select from "react-select";

// Utils
import "./addCardModal.css";
import { useTheme } from "../../../Utils/Themes/theme";

// Components

export const AddCardModal = ({isOpen, onClose, onAddLocation}) => {
    // Utils
    const theme = useTheme().theme;
    const icons = [{ value: "bx-fridge", label: <i className="bx bx-fridge" /> }, { value: "bxs-fridge", label: <i className="bx bxs-fridge" /> }, { value: "bx-box", label: <i className="bx bx-box" /> }, { value: "bxs-box", label: <i className="bx bxs-box" /> }, { value: "bxs-popsicle", label: <i className="bx bxs-popsicle" /> }, { value: "bx-popsicle", label: <i className="bx bx-popsicle" /> }, { value: "bx-coffee", label: <i className="bx bx-coffee" /> }, { value: "bxs-coffee", label: <i className="bx bxs-coffee" /> }, { value: "bxs-coffee-alt", label: <i className="bx bxs-coffee-alt" /> }, { value: "bxs-food-menu", label: <i className="bx bxs-food-menu" /> }, { value: "bx-food-menu", label: <i className="bx bx-food-menu" /> }, { value: "bx-coffee-togo", label: <i className="bx bx-coffee-togo" /> }, { value: "bxs-coffee-togo", label: <i className="bx bxs-coffee-togo" /> }];

    // States
    const [selectedIcon, setSelectedIcon] = React.useState("");
    const [selectedTitle, setSelectedTitle] = React.useState("");
    const [selectedDescription, setSelectedDescription] = React.useState("");

    const [errorMessage, setErrorMessage] = React.useState("");

    // Functions
    const handleIconChange = (event) => {
        setSelectedIcon(event.target.value);
    };

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value);
    };

    const checkInputs = () => {
        if (selectedTitle.trim() === "") {
            setErrorMessage("A name is required");
            return false;
        }

        setErrorMessage("");
        return true;
    }

    const handleAddLocation = () => {
        const inputsValid = checkInputs();

        if (inputsValid) {
            const newLocation = {
                icon: selectedIcon,
                title: selectedTitle,
                description: selectedDescription
            };

            onAddLocation(newLocation);
            resetFields();
        }
    };

    const resetFields = () => {
        // Reset all fields to default
        setSelectedIcon("");
        setSelectedTitle("");
        setSelectedDescription("");

        setErrorMessage("");
    }

    // Select bullshit
    // Having to do this is so unbelieveably dumb that I cannot fathom why the creator
    // even begun to think that this was actually a solution to styling this thing
    // over normal css
    const customStyles = {
        control: (provided, {isFocused}) => ({
            ...provided,
            width: "100%",
            minWidth: "200px", // Adjust the width of the select control
            boxShadow: isFocused ? "none" : provided.boxShadow, // Remove the box shadow when focused
            outline: isFocused ? "none" : provided.outline, // Remove the outline when focused
            borderColor: isFocused ? "var(--primary)" : provided.borderColor, // Set the outline color
        }),
        option: (provided, {isFocused}) => ({
            ...provided,
            borderColor: isFocused ? "none" : provided.borderColor, // Add a custom border color when focused
        })
      };

    const IconOption = ({ children, innerProps }) => (
        <div {...innerProps} >
            <p><i className={`bx ${children}`}/> {children}</p>
        </div>
    );

    return (
        <div className={`addCardModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <div className="closeBtn"><i className="bx bx-x" onClick={onClose}/></div>

                <h2>Add Location</h2>
                <label htmlFor="iconSelct">Icon</label>
                <Select id="iconSelect" className="iconSelect" components={{Option: IconOption}} styles={customStyles} options={icons} value={icons.find((icon) => icon.value === selectedIcon)} onChange={(option) => setSelectedIcon(option.value)} isSearchable={false}/>

                <label htmlFor="titleInput">Title</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={handleTitleChange}/>

                <label htmlFor="descriptionInput">Description</label>
                <input type="text" id="descriptionInput" value={selectedDescription} onChange={handleDescriptionChange}/>

                <button onClick={handleAddLocation} className="addBtn">Add</button>
            </div>
        </div>
    )
};