const {nativeTheme} = require("electron");
const {saveSetting, getSetting} = require("../userDataStorage");

const checkSystemTheme = () => {
    // See if system is in light or dark mode
    if (nativeTheme.shouldUseDarkColors) {
        // System is in dark mode
        saveSetting("sys-theme", "dark");
    } else {
        // System is in light mode
        saveSetting("sys-theme", "light");
    }
};

const getTheme = () => {
    return getSetting("theme");
};

module.exports = {
    checkSystemTheme,
    getTheme
};