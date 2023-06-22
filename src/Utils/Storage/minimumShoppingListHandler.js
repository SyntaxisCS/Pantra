import { getMinimumShoppingList, modifyMinimumShoppingList } from "./storage";

export const checkItemMinimums = async (item) => {
    if (item) {
        // assign variables
        const requiredCount = item.requiredCount;
        const count = item.count;

        // check if both exist
        if (requiredCount && count) {
            
            const percentage = requiredCount / count;
            const inversePercentage = 1 - percentage;

            // if item is within 15 percentage of required count add to minimum shopping list
            if (inversePercentage <= 0.15) {
                addToMinimumsList(item, inversePercentage);
            } else {
                deleteFromMinimumsList(item);
            }
        }
    }
};

const addToMinimumsList = async (item) => {

    // amount to buy algorithm
    const idealItems = (item.requiredCount * 1.15).toFixed(0);
    const wantedItems = parseInt(idealItems - item.requiredCount) + parseInt(item.requiredCount - item.count);

    const amountToBuy = wantedItems > 0 ? wantedItems : 0;
    
    // get minimums list
    const minimumShoppingList = await getMinimumShoppingList();
                
    // make copy
    let newShoppingList = minimumShoppingList;
    
    // check if shopping list exists
    if (minimumShoppingList) {

        // create new item
        let newItem = {
            name: item.name,
            brand: item.brand,
            count: amountToBuy,
            checked: false
        };

        // check if item already exists
        const itemIndex = newShoppingList.items.findIndex(minItem => minItem.name === item.name);

        if (itemIndex !== -1) {
            // exists, modify
            newShoppingList.items[itemIndex] = newItem;

            // save changes
            modifyMinimumShoppingList(newShoppingList);
        } else {
            // does not exist, just create it

            // Add new items to new shopping list
            let newItems = [...minimumShoppingList.items, newItem];
            newShoppingList.items = newItems;

            // save changes
            modifyMinimumShoppingList(newShoppingList);
        }
    }
};

const deleteFromMinimumsList = async (item) => {
    // check if exists
    const minimumShoppingList = await getMinimumShoppingList();

    // make copy
    let newShoppingList = minimumShoppingList;

    if (minimumShoppingList) {
        // check if item alrady exists

        const itemIndex = newShoppingList.items.findIndex((minItem) => minItem.name === item.name);

        if (itemIndex !== -1) {
            const updatedItems = [
                ...newShoppingList.items.slice(0, itemIndex),
                ...newShoppingList.items.slice(itemIndex+1)
            ];

            newShoppingList.items = updatedItems;
            modifyMinimumShoppingList(newShoppingList);
        }
        
        // does not exist, do nothing
    }
};