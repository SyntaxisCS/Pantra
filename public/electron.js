const {app, screen, BrowserWindow} = require("electron");
const appSettings = require("./settings");
const path = require("path");

const createWindow = () => {

    const displaySize = screen.getPrimaryDisplay().bounds;    
    let minSizeX = 450;
    let minSizeY = 630;

    const dimensions = appSettings.getWindowSettings();

    const mainWindow = new BrowserWindow({
        show: true,
        width: dimensions[0],
        height: dimensions[1],
        minWidth: minSizeX,
        minHeight: minSizeY,
        // frame: process.platform === "darwin" ? false : true,
        // titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    // Window resizing
    mainWindow.on("resized", () => {
        appSettings.saveWindowSize(mainWindow.getSize());
    });

    // Menu
    mainWindow.setMenu(null);

    // load files
    mainWindow.loadURL(
        isDev ? "http://localhost:3000#" : `file://${path.join(__dirname, "../build/index.html#")}`
    );
    
    // Dev Tools
    // mainWindow.webContents.openDevTools({mode: "detach"});

    if (require("electron-squirrel-startup")) {
        app.quit();
    }
}

app.on("ready", () => {
    createWindow();

    // Save system platform to settings file
    const platform = process.platform;
    const platformSetting = appSettings.getSetting("platform");

    if (!platformSetting) {
        switch(platform) {
            case "win32":
                appSettings.saveSetting("platform", "windows");
                break;
            
            case "darwin":
                appSettings.saveSetting("platform", "mac");
                break;

            default:
                appSettings.saveSetting("platform", "linux");
                break;
        }
    }

    // Check system theme on startup
    appSettings.checkSystemTheme();
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});