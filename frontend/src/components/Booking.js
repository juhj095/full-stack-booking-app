import { useState } from "react";
import ConfirmationModal from "./ConfimationModal";

const Booking = (props) => {
    const { booking, onDelete } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClicked = () => {
        setIsModalOpen(true);
    }

    const handleConfirmDelete = () => {
        onDelete(booking.id);
        setIsModalOpen(false);
    }

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <div>{booking.facilityName}</div>
            <div>{booking.address}</div>
            <div>{booking.time}</div>
            <button onClick={handleButtonClicked}>Poista</button>

            <ConfirmationModal
                isOpen={isModalOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message={"Oletko varma, että haluat poistaa varauksen?"}
                confirmMessage={"Poista varaus"}
            />
        </div>
    );
}

export default Booking;