const { ipcRenderer } = window.require("electron");


// Settings
export const saveSetting = async (name, value) => {
    try {
        await ipcRenderer.invoke("userDataStorage_saveSetting", name, value);
    } catch (err) {
        console.error(`Error saving setting: ${err}`);
    }
};

export const getSetting = async (name) => {
    try {
        const setting = await ipcRenderer.invoke("userDataStorage_getSetting", name);
        return setting;
    } catch (err) {
        console.error(`Error getting setting: ${err}`);
        return null;
    }
};

// Data
export const getData = async () => {
    try {
        const data = await ipcRenderer.invoke("userDataStorage_getData");
        return data;
    } catch (err) {
        console.error(`Error getting data: ${err}`);
        return null;
    }
};

export const getLocations = async () => {
    try {
        const locations = await ipcRenderer.invoke("userDataStorage_getLocations");
        return locations;
    } catch (err) {
        console.error(`Error getting locations: ${err}`);
        return null;
    };
};

export const getLocation = async (id) => {
    try {
        const location = await ipcRenderer.invoke("userDataStorage_getLocation", id);
        return location;
    } catch (err) {
        console.error(`Error getting location: ${err}`);
        return null;
    }
}

export const addLocation = async (location) => {
    try {
        await ipcRenderer.invoke("userDataStorage_addLocation", location);
    } catch (err) {
        console.error(`Error adding location: ${err}`);
    }
};

export const modifyLocation = async (id, newData) => {
    try {
        await ipcRenderer.invoke("userDataStorage_modifyLocation", id, newData);
    } catch (err) {
        console.error(`Error modifying location: ${err}`);
    }
};

export const deleteLocation = async (id) => {
    try {
        await ipcRenderer.invoke("userDataStorage_deleteLocation", id);
    } catch (err) {
        console.error(`Error deleting location: ${err}`);
    }
};

export const getItems = async (locationId) => {
    try {
        const items = await ipcRenderer.invoke("userDataStorage_getItems", locationId);
        return items;
    } catch (err) {
        console.error(`Error getting items for location (${locationId}): ${err}`);
        return null;
    }
};

export const getItem = async (locationId, name) => {
    try {
        const item = await ipcRenderer.invoke("userDataStorage_getItem", locationId, name);
        return item;
    } catch (err) {
        console.error(`Error getting item (${name}) for location (${locationId}): ${err}`);
        return null;
    }
};

export const addItem = async (locationId, item) => {
    try {
        await ipcRenderer.invoke("userDataStorage_addItem", locationId, item);
    } catch (err) {
        console.error(`Error adding item for location (${locationId})`);
    }
};

export const modifyItem = async (locationId, newData) => {
    try {
        await ipcRenderer.invoke("userDataStorage_modifyItem", locationId, newData);
    } catch (err) {
        console.error(`Error modifying item for location (${locationId}): ${err}`);
    }
};

export const deleteItem = async (locationId, itemName) => {
    try {
        await ipcRenderer.invoke("userDataStorage_deleteItem", locationId, itemName);
    } catch (err) {
        console.error(`Error deleting item (${itemName}) for location (${locationId}): ${err}`);
    }
};