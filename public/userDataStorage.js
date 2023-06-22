const {app, ipcMain} = require("electron");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userDataPath = app.getPath("userData");

// File Paths
const settingsFilePath = path.join(userDataPath, "settings.json"); // Electron app settings (window bounds)
const dataFilePath = path.join(userDataPath, "data.json"); // Persistant user app data (functional)

const createFileIfNotExists = (filePath, defaultContent) => {
    if (!fs.existsSync(filePath)) {

        // Set default dataFile structure
        if (filePath === dataFilePath) {
            
            // Change if needed
            const dataFileStructure = {
                "locations": [],
                "minShoppingList": {
                    "items": []
                },
                "shoppingLists": []
            }

            fs.writeFileSync(filePath, JSON.stringify(dataFileStructure, null, 2));
        } else {
            fs.writeFileSync(filePath, JSON.stringify(defaultContent, null, 2));
        }
    }
};

// Create the settings file if it doesn't exist
createFileIfNotExists(settingsFilePath, {});

// Create the data file if it doesn't exist
createFileIfNotExists(dataFilePath, {});

const writeFile = (destination, data) => {
    if (destination && data) {

        fs.writeFileSync(destination, JSON.stringify(data));

    } else {
        console.error("userDataStorage.js - writeFile: No destination or data provided");
    }
};

const readFile = (filePath) => {
    if (filePath) {
        try {
            const fileData = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(fileData);
        } catch (err) {
            console.error(`Error reading file at ${filePath}: ${err}`);
            return null;
        }
    } else {
        console.error("userDataStorage.js - readFile: No file path provided");
        return null;
    }
};

// Settings
const getSetting = (setting) => {
    if (setting) {

        // Get settings file
        const settings = readFile(settingsFilePath);

        // get value;
        return settings ? settings[setting] : null;
    } else {
        console.warn(`userDataStorage.js - getSetting(${setting}): No setting provided`);
        return null;
    }
};

const saveSetting = (name, value) => {
    if (name && value) {

        // Get settings file
        const settings = readFile(settingsFilePath) || {};
        
        // Make change
        settings[name] = value;

        // Write file
        writeFile(settingsFilePath, settings);

    } else {
        console.warn(`userDataStorage.js - saveSetting(${name}, ${value}): No setting name or value provided`);
    }
};

// Save Data
const getLocations = () => {
    // get data file - get locations from data file
    const locations = readFile(dataFilePath)["locations"];

    if (locations) {
        return locations;
    } else {
        return null;
    }
};

const getLocation = (id) => {
    if (id) {
        const locations = readFile(dataFilePath)["locations"];
        const location = locations.find((location) => location.id === id);
        return location;
    } else {
        console.warn(`userDataStorage.js - getLocation${id}: No id provided`);
        return null;
    }
};

const addLocation = (location) => {
    if (location) {
        // Create id and add to location
        let id = crypto.randomBytes(8).toString("hex");
        
        // Default structure
        location["id"] = id;
        location["items"] = [];
        ///////////////////////

        // Get data file - get locations
        const dataFile = readFile(dataFilePath);
        const locations = dataFile["locations"];
        
        if (locations) {
            const newLocations = [...locations, location];
            
            // replace locations with newLocations and then write to file
            dataFile["locations"] = newLocations;

            // save file
            writeFile(dataFilePath, dataFile);
        } else {
            console.warn(`userDataStorage.js - addLocation${location}: Unable to get locations from file`);
        }


    } else {
        console.warn(`userDataStorage.js - addLocation${location}: No location provided`);
    }
};

const modifyLocation = (id, newData) => {
    if (id && newData) {

        // Get data file - get locations
        const dataFile = readFile(dataFilePath);
        const locations = dataFile["locations"];

        if (locations) {
            const locationIndex = locations.findIndex((location) => location.id === id);

            if (locationIndex !== -1) {
                const updatedLocations = [
                    ...locations.slice(0, locationIndex),
                    newData,
                    ...locations.slice(locationIndex+1)
                ];

                dataFile["locations"] = updatedLocations;
                writeFile(dataFilePath, dataFile);
            } else {
                console.warn(`userDataStorage.js - modifyLocations(${id}, ${newData}): no location with that id found`);
            }
        } else {
            console.warn(`userDataStorage.js - modifyLocations(${id}, ${newData}): no locations found`);
        }

    } else {
        console.warn(`userDataStorage.js - modifyLocations(${id}, ${newData}): Missing fields`);
    }
};

const deleteLocation = (id) => {
    if (id) {
        // Get data file - get locations
        const dataFile = readFile(dataFilePath);
        const locations = dataFile["locations"];

        if (locations) {
            const locationIndex = locations.findIndex((location) => location.id === id);

            if (locationIndex !== -1) {
                const updatedLocations = [
                    ...locations.slice(0, locationIndex),
                    ...locations.slice(locationIndex+1)
                ];

                dataFile["locations"] = updatedLocations;
                writeFile(dataFilePath, dataFile);
            } else {
                console.warn(`userDataStorage.js - deleteLocation(${id}): no location with that id found`);
            }
        } else {
            console.warn(`userDataStorage.js - deleteLocation(${id}): no locations found`);
        }
    } else {
        console.warn(`userDataStorage.js - deleteLocation(${id}): missing field`);
    }
}

// Items
const getItems = (locationId) => {
    // get location with id
    const location = getLocation(locationId);
    
    if (location) {
        return location["items"];
    } else {
        return null;
    }
};

const getItem = (locationId, name) => {
    if (locationId && name) {
        // get items
        const items = readFile(dataFilePath)[locationId]["items"];
        const item = items.find((item) => item.name === name);
        return item;
    } else {
        console.warn(`userDataStorage.js - getItem(${locationId}, ${name}): Missing fields`);
        return null;
    }
};

const addItem = (locationId, item) => {
    if (item) {

        // Add any elements to item

        // get location items
        const location = getLocation(locationId);

        if (location["items"]) {
            const newItems = [...location["items"], item];

            // replace items with new items and then write to file
            location["items"] = newItems;

            // save file
            modifyLocation(locationId, location)
        } else {
            console.warn(`userDataStorage.js - addLocation(${locationId, item}): Unable to get items from file`);
        }

    } else {
        console.warn(`userDataStorage.js - addLocation(${item}): No item provided`);
    }
};

const modifyItem = (locationId, newData) => {
    if (locationId && newData) {
        const location = getLocation(locationId);

        if (location) {

            // get itmes and find index of new item
            const items = location.items;
            const itemIndex = items.findIndex((item) => item.name === newData.name);

            if (itemIndex !== -1) {
                // add newData to new items array
                const updatedItems = [
                    ...items.slice(0, itemIndex),
                    newData,
                    ...items.slice(itemIndex + 1)
                ];

                // update location with new items
                location.items = updatedItems;

                // write to file
                modifyLocation(locationId, location);
            } else {
                console.warn(`userDataStorage.js - modifyItem(${locationId}, ${newData}): no item with that name found`);
            }

        } else {
            console.warn(`userDataStorage.js - modifyItem(${locationId}, ${newData}): no location with that id found`);
        }

    } else {
        console.warn(`userDataStorage.js - modifyLocations(${locationId}, ${newData}): Missing fields`);
    }
};

const deleteItem = (locationId, itemName) => {
    if (locationId && itemName) {

        // get location
        const location = getLocation(locationId);

        if (location) {
            const items = location.items;
            const itemIndex = items.findIndex((item) => item.name === itemName);

            if (itemIndex !== -1) {
                const updatedItems = [
                    ...items.slice(0, itemIndex),
                    ...items.slice(itemIndex + 1)
                ];

                // update location with new items
                location.items = updatedItems;

                // write to file
                modifyLocation(locationId, location);
            } else {
                console.warn(`userDataStorage.js - deleteItem(${locationId}, ${itemName}): no item with that name found`);
            }

        } else {
            console.warn(`userDataStorage.js - deleteItem(${locationId}, ${itemName}): No location with that id found`);
        }

    } else {
        console.warn(`userDataStorage.js - deleteItem(${locationId}, ${itemName}): Missing fields`);
    }
};

// Shopping Lists
const getMinimumShoppingList = () => {
    // get data file - get minimums shopping list from data file
    const minimumList = readFile(dataFilePath)["minShoppingList"];

    if (minimumList) {
        return minimumList;
    } else {
        return null;
    }
};

const modifyMinimumShoppingList = (newData) => {
    if (newData) {

        // Get data file - get minimum shopping list
        const dataFile = readFile(dataFilePath);
        const minimumList = dataFile["minShoppingList"];

        if (minimumList) {
            dataFile["minShoppingList"] = newData;
            writeFile(dataFilePath, dataFile);
        } else {
            console.warn(`userDataStorage.js - modifyMinimumShoppingList(${newData}): Something exploded - despite minShoppingList being an undeletable list, it cannot be found`);
        }
    } else {
        console.warn(`userDataStorage.js - modifyMinimumShoppingList(${newData}): Missing new data`);
    }
};

const getShoppingLists = () => {
    // get data file - get shopping lists from data file
    const shoppingLists = readFile(dataFilePath)["shoppingLists"];

    if (shoppingLists) {
        return shoppingLists;
    } else {
        return null;
    }
};

const getShoppingList = (id) => {
    // get data file - get shopping list by id from data file
    if (id) {
        const shoppingLists = readFile(dataFilePath)["shoppingLists"];
        const shoppingList = shoppingLists.find((list) => list.id === id);
        return shoppingList;
    } else {
        console.warn(`userDataStorage.js - getShoppingList(${id}): No id provided`);
        return null;
    }
};

const addShoppingList = (shoppingList) => {
    if (shoppingList) {
        let id = crypto.randomBytes(8).toString("hex");
        let date = new Date();

        // Default structure
        shoppingList["id"] = id;
        shoppingList["items"] = [];
        shoppingList["dateAdded"] = date;
        shoppingList["timesUsed"] = 0;
        shoppingList["lastUsed"] = date;
        ///////////////////////

        // Get data file - get shopping lists
        const dataFile = readFile(dataFilePath);
        const shoppingLists = dataFile["shoppingLists"];

        if (shoppingLists) {
            const newShoppingLists = [...shoppingLists, shoppingList];

            // replace shopping lists with newShoppingLists and then write to file
            dataFile["shoppingLists"] = newShoppingLists;

            // save file
            writeFile(dataFilePath, dataFile);
        } else {
            console.warn(`userDataStorage.js - addShoppingList(${shoppingList}): Unable to get shopping lists from file`);
        }
    } else {
        console.warn(`userDataStorage.js - addShoppingList(${shoppingList}): No shopping list provided`);
    }
};

const modifyShoppingList = (id, newData) => {
    if (id && newData) {
        
        // Get data file - get shopping lists
        const dataFile = readFile(dataFilePath);
        const shoppingLists = dataFile["shoppingLists"];

        if (shoppingLists) {
            const listIndex = shoppingLists.findIndex((list) => list.id === id);

            if (listIndex !== -1) {
                const updatedList = [
                    ...shoppingLists.slice(0, listIndex),
                    newData,
                    ...shoppingLists.slice(listIndex+1)
                ];

                dataFile["shoppingLists"] = updatedList;
                writeFile(dataFilePath, dataFile);
            } else {
                console.warn(`userDataStorage.js - modifyShoppingLists(${id}, ${newData}): No shopping list with that id found`);
            }
        } else {
            console.warn(`userDataStorage.js - modifyShoppingLists(${id}, ${newData}): No shopping lists found`);
        }
    } else {
        console.warn(`userDataStorage.js - modifyShoppingList(${id}, ${newData}): Missing fields`);
    }
};

const deleteShoppingList = (id) => {
    if (id) {

        // Get data file - get shopping lists
        const dataFile = readFile(dataFilePath);
        const shoppingLists = dataFile["shoppingLists"];

        if (shoppingLists) {
            const listIndex = shoppingLists.findIndex(list => list.id === id);

            if (listIndex !== -1) {
                const updatedList = [
                    ...shoppingLists.slice(0, listIndex),
                    ...shoppingLists.slice(listIndex+1)
                ];

                dataFile["shoppingLists"] = updatedList;
                writeFile(dataFilePath, dataFile);
            } else {
                console.warn(`userDataStorage.js - deleteLocation(${id}): no shopping list with that id found`);
            }
        } else {
            console.warn(`userDataStorage.js - deleteShoppingList(${id}): No shopping lists found`);
        }
    } else {
        console.warn(`userDataStorage.js - deleteShoppingList(${id}): Missing id`);
    }
};

//---------------------------------------------------------------

// Expose IPC Methods

// Settings
ipcMain.handle("userDataStorage_saveSettings", (_, settings) => {
    writeFile(settingsFilePath, settings);
});

ipcMain.handle("userDataStorage_getSettings", () => {
    return readFile(settingsFilePath);
});

ipcMain.handle("userDataStorage_getSetting", (_, setting) => {
    return getSetting(setting);
});

ipcMain.handle("userDataStorage_saveSetting", (_, name, value) => {
    saveSetting(name, value);
});

// Data
ipcMain.handle("userDataStorage_saveData", (_, data) => {
    writeFile(dataFilePath, data);
});

ipcMain.handle("userDataStorage_getData", () => {
    return readFile(dataFilePath);
});

ipcMain.handle("userDataStorage_getLocations", () => {
    return getLocations();
});

ipcMain.handle("userDataStorage_getLocation", (_, id) => {
    return getLocation(id);
});

ipcMain.handle("userDataStorage_addLocation", (_, location) => {
    addLocation(location);
});

ipcMain.handle("userDataStorage_modifyLocation", (_, id, newData) => {
    modifyLocation(id, newData);
});

ipcMain.handle("userDataStorage_deleteLocation", (_, id) => {
    deleteLocation(id);
});

//  Items

ipcMain.handle("userDataStorage_getItems", (_, locationId) => {
    return getItems(locationId);
});

ipcMain.handle("userDataStorage_getItem", (_, locationId, name) => {
    return getItem(locationId, name);
});

ipcMain.handle("userDataStorage_addItem", (_, locationId, item) => {
    addItem(locationId, item);
});

ipcMain.handle("userDataStorage_modifyItem", (_, locationId, newData) => {
    modifyItem(locationId, newData);
});

ipcMain.handle("userDataStorage_deleteItem", (_, locationId, itemName) => {
    deleteItem(locationId, itemName);
});

// Shopping Lists

ipcMain.handle("userDataStorage_getMinimumShoppingList", () => {
    return getMinimumShoppingList();
});

ipcMain.handle("userDataStorage_modifyMinimumShoppingList", (_, newData) => {
    modifyMinimumShoppingList(newData);
});

ipcMain.handle("userDataStorage_getShoppingLists", () => {
    return getShoppingLists();
});

ipcMain.handle("userDataStorage_getShoppingList", (_, id) => {
    return getShoppingList(id);
});

ipcMain.handle("userDataStorage_addShoppingList", (_, shoppingList) => {
    addShoppingList(shoppingList);
});

ipcMain.handle("userDataStorage_modifyShoppingList", (_, id, newData) => {
    modifyShoppingList(id, newData);
});

ipcMain.handle("userDataStorage_deleteShoppingList", (_, id) => {
    deleteShoppingList(id);
});

module.exports = {
    // Settings
    saveSettings: (settings) => {
        writeFile(settingsFilePath, settings);
    },
    getSettings: () => {
        return readFile(settingsFilePath);
    },
    getSetting,
    saveSetting,

    // App data
    saveData: (data) => {
        writeFile(dataFilePath, data);
    },
    getData: () => {
        return readFile(dataFilePath);
    },

    // Locations
    getLocations,
    getLocation,
    addLocation,
    modifyLocation,
    deleteLocation,

    // Items
    getItems,
    getItem,
    addItem,
    modifyItem,
    deleteItem,

    // Shopping Lists
    getMinimumShoppingList,
    modifyMinimumShoppingList,
    getShoppingLists,
    getShoppingList,
    addShoppingList,
    modifyShoppingList,
    deleteShoppingList,
}