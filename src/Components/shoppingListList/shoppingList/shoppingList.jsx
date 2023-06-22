import React from "react";

// Utils
import { getMinimumShoppingList, getShoppingList, modifyMinimumShoppingList, modifyShoppingList } from "../../../Utils/Storage/storage";
import { useTheme } from "../../../Utils/Themes/theme";
import "./shoppingList.css";
import { AddItemModal } from "./addItemModal/addItemModal";

export const ShoppingList = (props) => {
    // Utils
    const theme = useTheme.theme;

    // States
    const [list, setList] = React.useState([]);

    const [showAddItemModal, setShowAddItemModal] = React.useState(false);
    
    // Functions
    const handleAddClick = () => {
        setShowAddItemModal(true);
    };

    const handleCloseModal = () => {
        setShowAddItemModal(false);
    };

    const handleAddItem = (newItem) => {
        let newList = list;
        newList.items = [...newList.items, newItem];

        // addItem to list
        if (props.listId === "minimums") {
            setList(newList);
            modifyMinimumShoppingList(newList);
        } else {
            newList.timesUsed++;
            newList.lastUsed = new Date();
            setList(newList);
            modifyShoppingList(props.listId, newList);
        }

        handleCloseModal();
        getList(props.listId);
    };

    const handleCheckItem = (itemName) => {
        let newList = list;
        const itemIndex = newList.items.findIndex(item => item.name === itemName);

        if (itemIndex !== -1) {
            newList.items[itemIndex].checked = !newList.items[itemIndex].checked;

            // modify list
            if (props.listId === "minimums") {
                setList(newList);
                modifyMinimumShoppingList(newList);
            } else {
                newList.timesUsed++;
                newList.lastUsed = new Date();
                setList(newList);
                modifyShoppingList(props.listId, newList);
            }
        }
    };

    const handleDeleteItem = (itemName) => {
        if (props.listId && itemName) {
            let newList = list;
            const itemIndex = newList.items.findIndex(item => item.name === itemName);

            if (itemIndex !== -1) {
                const updatedItems = [
                    ...newList.items.slice(0, itemIndex),
                    ...newList.items.slice(itemIndex+1)
                ];
                newList.items = updatedItems;

                setList(newList);
                if (props.listId === "minimums") {
                    modifyMinimumShoppingList(newList);
                } else {
                    modifyShoppingList(props.listId, newList);
                }
                getList(props.listId);
            }
        } else {
            console.warn(`handleDeleteIOtem(${itemName}): listId/itemName not provided`);
        }
    };

    const getList = async (id) => {
        console.info(`Getting shopping list with id ${id}`);

        if (id === "minimums") {
            const listData = await getMinimumShoppingList();

            setList(listData);
        } else {
            const listData = await getShoppingList(id);

            setList(listData);
        }
    };

    React.useEffect(() => {
        const id = props.listId;

        if (id) {
            getList(id);
        }
    }, []);

    return (
        <div className={`shoppingList ${theme}`}>
            <div className="header">
                <span className="title">{list.name ? list.name : "Minimums Shopping List"}</span>
            
                {props.listId === "minimums" ? <div style={{display:"none"}}/> : <button className="addBtn" onClick={handleAddClick}>Add</button>}
            </div>

            <AddItemModal isOpen={showAddItemModal} onClose={handleCloseModal} onAddItem={handleAddItem}/>

            {list.items ? list.items.length > 0 ? 
                <div className="itemListContainer">
                    {list.items.map(item => (
                        <div key={item.name} className="item">
                            <div className="text">
                                <p className="itemName">{item.name}</p>
                                <p className="itemBrand">{item.brand}</p>
                            </div>

                            <p className="itemCount">{item.count}</p>

                            <input className="checkbox" type="checkbox" onChange={() => handleCheckItem(item.name)}/>

                            <div className="deleteButtonWrapper">
                                <button className="deleteBtn" onClick={() => handleDeleteItem(item.name)}><i className="bx bx-trash"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            : props.listId === "minimums" ? <h1 className="minimumsExplanation">You're all set for now! Items near or below their required amounts will automatically be added to this list.</h1> : <h1 className="noItemsExplanation">No items found on this list</h1> : props.listId === "minimums" ? <h1 className="minimumsExplanation">You're all set for now! Items near or below their required amounts will automatically be added to this list.</h1> : <h1 className="noItemsExplanation">No items found on this list</h1>}

        </div>
    );
};