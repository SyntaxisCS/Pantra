import React from "react";

// Utils
import { useTheme } from "../../../Utils/Themes/theme";
import "./locationDeleteConfirmModal.css";

export const LocationDeleteConfirmModal = ({isOpen, onClose, onDeleteConfirm, locationName}) => {
    // Utils
    const theme = useTheme().theme;

    return (
        <div className={`locationDeleteConfirmModal ${isOpen ? "show" : "hidden"} ${theme}`}>
            <div className="modal">
                <i className="bx bx-x" onClick={onClose}/>

                <h2>Delete Location?</h2>
                <p className="informationalText">{`Are you sure you want to delete ${locationName ? locationName : "this location"}? There are items in this location and they will be deleted as well!`}</p>
                <p className="warningText">There is an irreversable action!</p>

                <button onClick={onClose} className="cancelBtn">Nevermind!</button>
                <button onClick={onDeleteConfirm} className="deleteBtn">Delete!</button>
            </div>
        </div>
    )
};