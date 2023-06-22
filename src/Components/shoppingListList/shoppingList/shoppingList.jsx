import React from "react";

// Utils
import { getMinimumShoppingList, getShoppingList, modifyMinimumShoppingList, modifyShoppingList } from "../../../Utils/Storage/storage";
import { useTheme } from "../../../Utils/Themes/theme";
import "./shoppingList.css";

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
        let newEdit = [...list];
        newEdit.items = [...newEdit.items, newItem];

        setList(newEdit);

        // addItem to list
        if (props.listId === "minimums") {
            modifyMinimumShoppingList(newEdit);
        } else {
            modifyShoppingList(props.listId, newEdit);
        }

        handleCloseModal();
        getList(props.listId);
    };

    const handleCheckItem = (itemName) => {
        const updatedList = [...list];
        const itemIndex = updatedList.items.findIndex(item => item.name === itemName);

        if (itemIndex !== -1) {
            updatedList.items[itemIndex].checked = !updatedList.items[itemIndex].checked;
            setList(updatedList);

            // modify list
            if (props.listId === "minimums") {
                modifyMinimumShoppingList(updatedList);
            } else {
                modifyShoppingList(props.listId, updatedList);
            }
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
        console.log(id);

        if (id) {
            getList(id);
        }
    }, []);

    return (
        <div className={`shoppingList ${theme}`}>
            <div className="header">
                <h1 className="title">{props.title ? props.title : "[List Name]"}</h1>
            
                <button className="addBtn" onClick={handleAddClick}>Add</button>
            </div>

            {list.length > 0 ? 
                <div className="itemListContainer">
                    {list.items.map(item => (
                        <div key={item.name} className="item">
                            <div className="text">
                                <p className="itemName">{item.name}</p>
                                <p className="itemBrand">{item.brand}</p>
                            </div>

                            <p className="itemCount">{item.count}</p>

                            <input type="checkbox" onChange={() => handleCheckItem(item.name)}/>
                        </div>
                    ))}
                </div>
            : props.listId === "minimums" ? <h1 className="minimumsExplanation">You're all set for now! Items near or below their required amounts will automatically be added to this list.</h1> : <h1 className="noItemsExplanation">No items found on this list</h1>}

        </div>
    );
};