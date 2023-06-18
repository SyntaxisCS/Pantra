import React from "react";

// Utils
import { useNavigate } from "react-router";
import { useTheme } from "../../Utils/Themes/theme";
import { addItem, deleteItem, getLocation, modifyItem } from "../../Utils/Storage/storage";
import { AddItemModal } from "./addItemModal/addItemModal";
import "./itemList.css";

export const ItemList = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    // States
    const [items, setItems] = React.useState([]);
    const [showAddItemModal, setShowAddItemModal] = React.useState(false);

    // Functions
    const handleAddClick = () => {
        setShowAddItemModal(true);
    };

    const handleCloseModal = () => {
        setShowAddItemModal(false);
    }

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);

        addItem(props.location, newItem);
        handleCloseModal();
        getInitialItems();
    }

    const handleItemCountAdd = (itemName) => {
        if (items.length > 0) {
            let newItemArray = [...items];
            const itemIndex = newItemArray.findIndex((item) => item.name === itemName);

            if (itemIndex !== -1) {
                // Add to count
                newItemArray[itemIndex].count++;

                // set new state
                setItems(newItemArray);

                // save to file
                modifyItem(props.location, newItemArray[itemIndex]);
            } else {
                console.warn(`Could not find an item with that name (${itemName}) in the items state`);
            }
        }
    };

    const handleItemCountSub = (itemName) => {
        if (items.length > 0) {
            let newItemArray = [...items];
            const itemIndex = newItemArray.findIndex((item) => item.name === itemName);

            if (itemIndex !== -1) {
                // Add to count
                newItemArray[itemIndex].count--;

                // set new state
                setItems(newItemArray);

                // save to file
                modifyItem(props.location, newItemArray[itemIndex]);
            } else {
                console.warn(`Could not find an item with that name (${itemName}) in the items state`);
            }
        }
    };

    const handleDeleteItem = (itemName) => {
        if (props.location && itemName) {
            deleteItem(props.location, itemName);
            getInitialItems();
        } else {
            console.warn(`handleDeleteItem(${itemName}): Props.location/itemName not provided.`);
        }
    };

    const getInitialItems = async () => {
        console.info(`Getting items for location ${props.location}`);
        if (props.location !== "undefined") {
            const locationData = await getLocation(props.location);

            if (locationData) {
                setItems(locationData["items"]);
            }  else {
                console.info("No items found");
            }
        } else {
            console.warn("No id provided");
            navigate("/");
        }
    };

    React.useEffect(() => {
        getInitialItems();
    },[]);

    return (
        <div className={`itemList ${theme}`}>
            <div className="header">
                <span>{items.length > 1 ? `${items.length} items` : (items.length < 1 ? `${items.length} items` : `${items.length} item`) }</span>
                <button className="addBtn" onClick={handleAddClick}>Add</button>
            </div>
            {items.length > 0 ?
                <div className="itemListContainer">
                    {items.map(item => (
                        <div key={item.name} className={`item`}>
                            <div className="text">
                                <p className="itemName">{item.name}</p>
                                <p className="itemBrand">{item.brand}</p>
                            </div>

                            <div className="text">
                                {item.description ? <p className="itemDescription">{item.description}</p> : <p/>}
                                {item.expiry ? <p>{`Expires on ${item.expiry}`}</p> : <p/>}
                            </div>

                            <div className="itemCountContainer">
                                <button className="minusButton" onClick={() => handleItemCountSub(item.name)}>-</button>
                                <p className="itemCount">{item.count}</p>
                                <button className="plusButton" onClick={() => handleItemCountAdd(item.name)}>+</button>
                            </div>

                            <div className="deleteButtonWrapper">
                                <button className="deleteBtn" onClick={() => handleDeleteItem(item.name)}><i className="bx bx-trash"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            : <h1>No items found in this location</h1>}

            <AddItemModal isOpen={showAddItemModal} onClose={handleCloseModal} onAddItem={handleAddItem}/>
        </div>
    )
};