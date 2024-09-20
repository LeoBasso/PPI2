import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { updateActivity } from "../../queries/activities/activities";
import { CreateActivitySchema } from "../../schemas/CreateActivitySchema";
import { ActivityTypes } from "../../arrays/ActivityTypes";

const UpdateActivityModal = (activity) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
console.log(activity);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: activity.value.type,
      distance: activity.value.distance,
      time: activity.value.time,
      elevation: activity.value.elevation,
      date: activity.value.date,
    },
    resolver: yupResolver(CreateActivitySchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (activities) => {
    setCreateModalOpen(false);
    await updateActivity(activity.value.id, activities);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={"Editar propriedade"}
        colorText={"text-green-600"}
        backdrop={false}
        modalButton={<AiOutlineEdit />}
        classStyle={false}
      >
        <form onSubmit={handleSubmit(handlerUpdate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="select"
              name="type"
              labelText="Tipo de atividade"
              placeholder="Ciclismo"
              options={ActivityTypes}
              control={control}
              hasError={JSON.stringify(errors.name?.message)}
            />
            <FormRow
              type="number"
              name="distance"
              labelText="Distância em Km"
              placeholder="10Km"
              control={control}
              hasError={JSON.stringify(errors.distance?.message)}
            />
            <FormRow
              type="number"
              name="time"
              labelText="Tempo"
              placeholder="10 min"
              control={control}
              hasError={JSON.stringify(errors.time?.message)}
            />
            <FormRow
              type="number"
              name="elevation"
              labelText="Ganho de Elevação"
              placeholder="400m"
              control={control}
              hasError={JSON.stringify(errors.elevation?.message)}
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

export default UpdateActivityModal;
