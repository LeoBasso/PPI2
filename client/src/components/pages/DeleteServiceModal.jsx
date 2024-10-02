import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import OpenCloseModal from "../modal/OpenCloseModal";
import { DeleteConfirmation } from "../modal/DeleteConfirmation";
import { deleteService } from "../../queries/services/services";

export default function DeleteServiceModal(service) {
  const [isModalDeleteOpen, setDeleteModalOpen] = useState(false);

  function openDeleteModal() {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function handlerDelete() {
    setDeleteModalOpen(false);
    await deleteService(service.value.id);
  }
  
    return (
      <div className="flex items-center justify-center">
        <OpenCloseModal
          isModalOpen={isModalDeleteOpen}
          openModal={openDeleteModal}
          closeModal={closeDeleteModal}
          modalName={""}
          backdrop={true}
          modalButton={<BsTrashFill />}
          colorText={"text-red-600"}
          classStyle={false}
        >
          <DeleteConfirmation
            isOpen={isModalDeleteOpen}
            onCancel={closeDeleteModal}
            onConfirm={handlerDelete}
            message="Tem certeza que deseja excluir esse serviço?"
          />
        </OpenCloseModal>
      </div>
    );
}
