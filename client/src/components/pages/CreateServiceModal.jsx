import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateServiceSchema } from "../../schemas/CreateServiceSchema";
import { createService } from "../../queries/services/services";

const CreateServiceModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      time: "",
      price: "",
    },
    resolver: yupResolver(CreateServiceSchema),
  });

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (propertys) => {
    console.log(propertys);
    setCreateModalOpen(false);
    await createService(propertys);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={"Adicionar Serviço"}
        modalButton={" + Adicionar Serviço"}
        classStyle={true}
        backdrop={false}
        colorText={"text-gray-300"}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
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
          <div className="relative inline-flex items-center justify-center">
            <ClearButtonForm onClick={() => reset()} />
            <SubmitButton label="Enviar" />
          </div>
        </form>
      </OpenCloseModal>
    </div>
  );
};

export default CreateServiceModal;
