import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { updateService } from "../../queries/services/services";
import { CreateServiceSchema } from "../../schemas/CreateServiceSchema";

const UpdateServiceModal = (service) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  console.log(service);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: service.value.type,
      time: service.value.time,
      price: service.value.price,
    },
    resolver: yupResolver(CreateServiceSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (services) => {
    setCreateModalOpen(false);
    await updateService(service.value.id, services);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={"Editar Serviço"}
        colorText={"text-green-600"}
        backdrop={false}
        modalButton={<AiOutlineEdit />}
        classStyle={false}
      >
        <form onSubmit={handleSubmit(handlerUpdate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="varchar"
              name="type"
              labelText="Tipo de Serviço"
              placeholder="Digite o tipo de serviço"
              control={control}
              hasError={JSON.stringify(errors.type?.message)}
            />
            <FormRow
              type="number"
              name="time"
              labelText="Tempo (min)"
              placeholder="Digite o tempo"
              control={control}
              hasError={JSON.stringify(errors.time?.message)}
            />
            <FormRow
              type="number"
              name="price"
              labelText="Valor R$"
              placeholder="Digite o valor do serviço"
              control={control}
              hasError={JSON.stringify(errors.elevation?.message)}
            />
          </div>
          <div className="flex justify-center">
            <ClearButtonForm onClick={() => reset()} />
            <SubmitButton label="Enviar" />
          </div>
        </form>
      </OpenCloseModal>
    </div>
  );
};

export default UpdateServiceModal;
