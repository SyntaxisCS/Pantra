import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";

// Utils
import { ThemeProvider } from "./Utils/Themes/theme";
import "./index.css";

// Pages
import { HomePage } from "./Pages/homePage";
import { LocationItemPage } from "./Pages/locationItemPage";
import { ThemeSettingsPage } from "./Pages/Settings/themeSettings";
import { AboutSettingsPage } from "./Pages/Settings/aboutSettings";
import { GeneralSettingsPage } from "./Pages/Settings/generalSettings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider>
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/l/:id" element={<LocationItemPage/>}/>

                {/* Settings */}
                <Route path="/settings/general" element={<GeneralSettingsPage/>}/>
                <Route path="/settings/theme" element={<ThemeSettingsPage/>}/>
                <Route path="/settings/about" element={<AboutSettingsPage/>}/>
            </Routes>
        </HashRouter>
    </ThemeProvider>
);