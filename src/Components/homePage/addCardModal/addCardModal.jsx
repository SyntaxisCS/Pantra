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

    const handleAddLocation = () => {
        const newLocation = {
            icon: selectedIcon,
            title: selectedTitle,
            description: selectedDescription
        };

        onAddLocation(newLocation);
        setSelectedIcon("");
        setSelectedTitle("");
        setSelectedDescription("");
    };

    // Select bullshit
    const customStyles = {
        control: (provided) => ({
          ...provided,
          minWidth: "200px", // Adjust the width of the select control
          outlineColor: "#8c00ff", // Set the outline color
        }),
        option: (provided, state) => ({
          ...provided,
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          cursor: "pointer",
          flexDirection: "column",
          backgroundColor: state.isSelected ? "#f0f0f0" : "transparent",
        }),
        icon: {
          marginRight: "8px",
          fontSize: "18px",
        },
      };

    const IconOption = ({ children, innerProps }) => (
        <div {...innerProps} >
            <p><i className={`bx ${children}`}/> {children}</p>
        </div>
    );

    return (
        <div className={`addCardModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Add Location</h2>
                <label htmlFor="iconSelct">Icon: </label>
                <Select id="iconSelect" className="iconSelect" components={{Option: IconOption}} styles={customStyles} options={icons} value={icons.find((icon) => icon.value === selectedIcon)} onChange={(option) => setSelectedIcon(option.value)}/>

                <label htmlFor="titleInput">Title</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={handleTitleChange}/>

                <label htmlFor="descriptionInput">Description</label>
                <input type="text" id="descriptionInput" value={selectedDescription} onChange={handleDescriptionChange}/>

                <button onClick={handleAddLocation} className="addBtn">Add</button>
            </div>
        </div>
    )
};