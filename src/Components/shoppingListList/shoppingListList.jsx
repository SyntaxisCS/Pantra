import React from "react";

// Components
import { AddListModal } from "./addListModal/addListModal";
import { addShoppingList, deleteShoppingList, getMinimumShoppingList, getShoppingLists } from "../../Utils/Storage/storage";

// Utils
import { dateBeautifier } from "../../Utils/dates";
import { useTheme } from "../../Utils/Themes/theme";
import { useNavigate } from "react-router";
import "./shoppingListList.css";

export const ShoppingListList = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    // States
    const [minimumList, setMinimumList] = React.useState(null);
    const [lists, setLists] = React.useState(null);

    const [addListModal, setAddListModal] = React.useState(false);

    // Functions
    const handleAddClick = () => {
        setAddListModal(true);
    };

    const closeAddListModal = () => {
        setAddListModal(false);
    };
    
    const handleAddList = (newList) => {
        addShoppingList(newList);
        closeAddListModal();
        getInitialLists();
    };

    const handleDeleteList = async (listId) => {
        if (listId) {
            await deleteShoppingList(listId);
            getInitialLists();
        }
    };

    const handleListClick = (id) => {
        if (id) {
            navigate(`/sl/${id}`);
        }
    };

    const getInitialMinimumList = async () => {
        console.info("Getting minimum shopping list data...");
        const listData = await getMinimumShoppingList();

        if (listData) {
            console.info("Minimum list found");
            setMinimumList(listData);
        } else {
            console.info("No minimum shopping list found");
        }
    };

    const getInitialLists = async () => {
        console.info(`Checking for shopping lists...`);
        const listData = await getShoppingLists();
        
        if (listData) {
            console.info(`${listData.length} shopping lists found`);
            setLists(listData);
        } else {
            console.info("No shopping lists found");
        }
    };

    React.useEffect(() => {
        getInitialMinimumList();
        getInitialLists();
    }, []);

    return (
        <div className={`shoppingListList ${theme}`}>
            <div className="header">
                <button className="addBtn" onClick={handleAddClick}>Create List</button>
            </div>

            <div className="minimumShoppingListContainer">
                {minimumList ? (
                    <div className="shoppingListContainer" onClick={() => handleListClick("minimums")}>
                        <h1 className="title">Minimums List</h1>
                        
                        <p className="explanation">Items near or below their required amount are automatically added here.</p>
                        
                        <p className="numOfItems">{`${minimumList.items.length} items`}</p>
                        <i className="bx bx-chevron-right"/>
                    </div>
                ) : <div/>}
            </div>

            <hr/>

            {lists ? lists.legnth > 0 ?
                <div className="shoppingListContainer">
                    {lists.map(list => (
                        <div className="listWrapper" key={list.id}>
                            <div className="list" onClick={() => handleListClick(list.id)}>
                                <h1 className="title">{list.name}</h1>
                                <p className="lastUsed">{`Last used ${list.lastUsed ? dateBeautifier(list.lastUsed) : "unknown"}`}</p>
                                <p className="numOfItems">{`${list.items.length} items`}</p>
                                <i className="bx bx-chevron-right"/>
                            </div>
                            
                            <div className="deleteButtonWrapper">
                                <button className="deleteBtn" onClick={() => handleDeleteList(list.id)}><i className="bx bx-trash"/></button>
                            </div>
                        </div>
                    ))}
                </div> : <h1 style={{textAlign: "center"}}>No shopping lists found!</h1> : <h1 style={{textAlign: "center"}}>No shopping lists found!</h1>
            }

            <AddListModal isOpen={addListModal} onClose={closeAddListModal} onAddList={handleAddList}/>
        </div>
    )
}