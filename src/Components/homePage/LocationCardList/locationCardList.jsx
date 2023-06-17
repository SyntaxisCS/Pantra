import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import { LocationCard } from "../LocationCard/locationCard.jsx";
import { AddCard } from "../addCard/addCard.jsx";
import { AddCardModal } from "../addCardModal/addCardModal.jsx";

// Utils
import { addLocation, deleteLocation, getLocation, getLocations } from "../../../Utils/Storage/storage.js";
import { useTheme } from "../../../Utils/Themes/theme";
import "./locationCardList.css";
import { LocationDeleteConfirmModal } from "../locationDeleteConfirmModal/locationDeleteConfirmModal.jsx";

export const LocationCardList = (props) => {
    // Utils
    const theme = useTheme().theme;
    const navigate = useNavigate();

    // States
    const [locations, setLocations] = React.useState([]);

    // Modals
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    // Functions
    const handleCardClick = (id) => {
        if (id) {
            navigate(`/l/${id}`);
        }
    }

    // Modals

    // Add Card Modal
    const handleAddCardClick = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleAddLocation = (newLocation) => {
        setLocations([...locations, newLocation]);

        addLocation(newLocation);
        handleCloseAddModal();
        window.location.reload();
    };

    // Delete Confirm Modal
    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteLocation = async (locationId) => {
        if (locationId) {
            const location = await getLocation(locationId);
            if (location) {
                const items = location["items"];

                if (items.length > 0) {
                    // ask for confirmation - open modal
                    handleOpenDeleteModal();
                    window.location.reload();
                } else {
                    // delete locations
                    deleteLocation(locationId);

                    // reload page
                    window.location.reload();
                }

            } else {
                console.warn(`handleDeleteLocation: something exploded. Despite having a location id, no location could be obtained using getLocation`);
            }
        }
    };

    const deleteLocationConfirm = (locationId) => {
        if (locationId) {
            // delete location
            deleteLocation(locationId);

            // close modal
            handleCloseDeleteModal();
            
            // refresh location list
            window.location.reload();
        }
    };

    const getInitialLocations = async () => {
        console.info("Checking for saved locations...");
        const locationData = await getLocations();

        if (locationData && locationData.length > 0) {
            setLocations(locationData);
            console.info(`${locationData.length} locations found`);
        } else {
            console.info("No locations found");
        }
    };

    React.useEffect(() => {
        getInitialLocations();
    }, []);

    return (
        <div className={`locationCardList ${theme}`}>
        {/* Render location cards */}
        {locations.map((location, index) => (
            <div key={index} className="location">
                <button className="deleteBtn" onClick={() => handleDeleteLocation(location.id)}><i className="bx bx-trash"/></button>
                <div className="locationClick" onClick={() => handleCardClick(location.id)}>
                    <LocationCard icon={location.icon} title={location.title} description={location.description ? location.description : ""}/>
                </div>

                <LocationDeleteConfirmModal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} onDeleteConfirm={() => deleteLocationConfirm(location.id)} locationName={location.title} numOfItems={location.items}/>
            </div>
        ))}

        {/* Render Add card */}
        <div onClick={handleAddCardClick}>
            <AddCard/>
        </div>

        <AddCardModal isOpen={showAddModal} onClose={handleCloseAddModal} onAddLocation={handleAddLocation}/>
        </div>
    );
};
