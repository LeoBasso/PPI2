import { BsTrashFill } from "react-icons/bs";
import CloseModal from "../Buttons/CloseModal";

export function DeleteConfirmation({ onCancel, onConfirm, message }) {
  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="flex h-screen overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-screen mx-auto md:inset-0 max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative p-4 text-center bg-[#1c1917] bg-opacity-85 rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <CloseModal onCancel={onCancel} />
          <BsTrashFill className="text-white w-8 h-8 mb-3.5 mx-auto" />
          <p className="mb-4 text-white ">{message}</p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={onCancel}
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-[#6e776e] rounded hover:bg-[#989f98] hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Não, cancelar
            </button>
            <button
              onClick={onConfirm}
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-500 hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Sim, continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
