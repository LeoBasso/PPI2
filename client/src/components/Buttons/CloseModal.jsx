const CloseModal = ({ onCancel }) => {
  return (
    <button
      type="button"
      onClick={onCancel}
      className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-toggle="deleteModal"
    >
      <p className="mr-2 pl-2">X</p>
      <span className="sr-only">Close modal</span>
    </button>
  );
};

export default CloseModal;
