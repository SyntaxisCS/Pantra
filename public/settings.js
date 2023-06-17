const {getWindowSettings, saveWindowSize} = require("./Settings/windowSize");
const {getTheme, checkSystemTheme} = require("./Settings/theme");
const {saveSetting, getSetting} = require("./userDataStorage");

module.exports = {
    // General Settings
    getSetting,
    saveSetting,

    // Window Size
    getWindowSettings,
    saveWindowSize,

    // Theme
    getTheme,
    checkSystemTheme,
}