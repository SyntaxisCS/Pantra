const {screen} = require("electron");
const { getSetting, saveSetting } = require("../userDataStorage");

const getWindowSettings = () => {
    const displaySize = screen.getPrimaryDisplay().bounds;
    let sizeX = displaySize.width * 0.55;
    let sizeY = displaySize.height * 0.6;

    const defaultSettings = [sizeX, sizeY];

    // Get size from settings file
    const size = getSetting("win-size");

    // If size already exists return the value
    if (size) {
        return size;
    } else {

        // If size does not exist set it to default value
        saveSetting("win-size", defaultSettings);

        // Return default settings
        return defaultSettings;
    }
};

const saveWindowSize = (windowSize) => {
    saveSetting("win-size", windowSize);
};

module.exports = {
    getWindowSettings,
    saveWindowSize
}