import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { updateSchedule } from "../../queries/schedules/schedules";
import { CreateScheduleSchema } from "../../schemas/CreateScheduleSchema";
import { ScheduleTypes } from "../../arrays/ScheduleTypes";

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
      date: schedule.value.date,
      hour: schedule.value.hour,
    },
    resolver: yupResolver(CreateScheduleSchema),
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
              placeholder="Escolha a data"
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
