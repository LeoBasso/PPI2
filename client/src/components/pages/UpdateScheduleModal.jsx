import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { UpdateScheduleSchema } from "../../schemas/UpdateScheduleSchema";
import { updateSchedule } from "../../queries/schedules/schedules";

const UpdateScheduleModal = (schedule) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  console.log(schedule);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
      hour: "",
      status: 'Pendente',
    },
    resolver: yupResolver(UpdateScheduleSchema),
  });

  function openUpdateModal() {
    setCreateModalOpen(true);
  }

  function closeUpdateModal() {
    setCreateModalOpen(false);
  }

  const handlerUpdate = async (schedules) => {
    setCreateModalOpen(false);
    await updateSchedule(schedule.value.id, schedules);
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openUpdateModal}
        closeModal={closeUpdateModal}
        modalName={"Editar Agendamento"}
        colorText={"text-green-600"}
        backdrop={false}
        modalButton={<AiOutlineEdit />}
        classStyle={false}
      >
        <form onSubmit={handleSubmit(handlerUpdate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="date"
              name="date"
              labelText="Data"
              placeholder="Data"
              control={control}
              hasError={JSON.stringify(errors.date?.message)}
            />
            <FormRow
              type="time"
              name="hour"
              labelText="Hora"
              placeholder="Digite a hora"
              control={control}
              hasError={JSON.stringify(errors.hour?.message)}
            />
            <FormRow
              type="text"
              name="status"
              labelText="Status"
              disabled={true}
              control={control}
              hasError={JSON.stringify(errors.status?.message)}
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

export default UpdateScheduleModal;
