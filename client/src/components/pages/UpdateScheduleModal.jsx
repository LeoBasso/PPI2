import { useState } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { updateSchedule } from "../../queries/schedules/schedules";
import { UpdateScheduleSchema } from "../../schemas/UpdateScheduleSchema";

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
        modalButton={
          <AiOutlineEdit className="text-[#6e776e]" />
        }
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
              hasError={errors.date?.message}
            />
            <FormRow
              type="hour"
              name="hour"
              labelText="Selecione o horário"
              control={control}
              hasError={errors.hour}
              options={[
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30",
              ]}
              disabled={false}
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

export default UpdateScheduleModal;
