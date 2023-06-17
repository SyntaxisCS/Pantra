import React from "react";
import { useTheme } from "../../../Utils/Themes/theme";
import "./addCard.css";

export const AddCard = () => {
  const theme = useTheme().theme;

  return (
    <div className={`addCard ${theme}`}>
        <i className="bx bx-plus-circle" />
        <h1>Add</h1>
    </div>
  );
};
