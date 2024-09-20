import { useState, useEffect } from "react";
import { createActivity } from "../../queries/activities/activities";
import { useForm, Controller } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateActivitySchema } from "../../schemas/CreateActivitySchema";
import { ActivityTypes } from "../../arrays/ActivityTypes";

const CreateActivityModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
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
      distance: 0,
      time: "",
      elevation: "",
      date: "",
    },
    resolver: yupResolver(CreateActivitySchema),
  });

  const typeValue = watch("type");

  useEffect(() => {
    if (typeValue === "Natação") {
      setValue("elevation", "");
    }
    setSelectedType(typeValue);
  }, [typeValue, setValue]);

  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (propertys) => {
    console.log(propertys);
    setCreateModalOpen(false);
    await createActivity(propertys);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={"Adicionar atividade"}
        modalButton={" + Adicionar atividade"}
        classStyle={true}
        backdrop={false}
        colorText={"text-gray-300"}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="select"
              name="type"
              labelText="Tipo de atividade"
              placeholder="Selecione"
              options={ActivityTypes}
              control={control}
              hasError={JSON.stringify(errors.type?.message)}
            />
            <FormRow
              type="number"
              name="distance"
              labelText="Distância (Km)"
              placeholder="Distância em Km"
              control={control}
              hasError={JSON.stringify(errors.distance?.message)}
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
              name="elevation"
              labelText="Ganho de Elevação (m)"
              placeholder="Digite o ganho de elevação"
              control={control}
              hasError={JSON.stringify(errors.elevation?.message)}
              disabled={selectedType === "Natação"}
            />
            <FormRow
              type="date"
              name="date"
              labelText="Data"
              placeholder="14/04/2000"
              control={control}
              hasError={JSON.stringify(errors.date?.message)}
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

export default CreateActivityModal;
