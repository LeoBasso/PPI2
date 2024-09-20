import OpenCloseModal from "../modal/OpenCloseModal";
import CloseModal from "../Buttons/CloseModal";
import { useState } from "react";
import { toast } from "react-toastify";

const CompareActivitiesModal = ({ activities, onClose }) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  if (activities.length !== 2) return null;

  const [activity1, activity2] = activities;

  function openCreateModal() {
    const response = handleCompare();
    if (response) {
      setCreateModalOpen(true);
    }
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
    onClose();
  }

  const handleCompare = () => {
    if (activities.length === 2 && activities[0].type === activities[1].type) {
      return true;
    } else {
      toast.error('Você deve selecionar DUAS atividades do mesmo tipo');
      return false;
    }
  };

  return (
    <OpenCloseModal
      isModalOpen={isModalCreateOpen}
      openModal={openCreateModal}
      closeModal={closeCreateModal}
      modalName={"Compare Activities"}
      modalButton={"Comparar"}
      classStyle={true}
      backdrop={false}
      colorText={"text-gray-300"}
    >
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Activity 1 Details */}
        <div className="flex flex-col border rounded-lg p-4 mb-4 bg-[#1c1917] text-gray-300">
          <h3 className="text-lg font-semibold mb-2">Activity 1</h3>
          <div className="mb-2">Type: {activity1.type}</div>
          <div className="mb-2">Distance: {activity1.distance} Km</div>
          {activity1.time && <div className="mb-2">Time: {activity1.time} min</div>}
          {activity1.avg && <div className="mb-2">Average Speed: {activity1.avg} Km/h</div>}
          {activity1.elevation && <div className="mb-2">Elevation: {activity1.elevation} m</div>}
          <div>Date: {activity1.date}</div>
        </div>

        {/* Activity 2 Details */}
        <div className="flex flex-col border rounded-lg p-4 mb-4 bg-[#1c1917] text-gray-300">
          <h3 className="text-lg font-semibold mb-2">Activity 2</h3>
          <div className="mb-2">Type: {activity2.type}</div>
          <div className="mb-2">Distance: {activity2.distance} Km</div>
          {activity2.time && <div className="mb-2">Time: {activity2.time} min</div>}
          {activity2.avg && <div className="mb-2">Average Speed: {activity2.avg} Km/h</div>}
          {activity2.elevation && <div className="mb-2">Elevation: {activity2.elevation} m</div>}
          <div>Date: {activity2.date}</div>
        </div>
      </div>

      {/* Close Modal Button */}
      <div className="flex items-center justify-center">
        <CloseModal onCancel={closeCreateModal} />
      </div>
    </OpenCloseModal>
  );
};

export default CompareActivitiesModal;
