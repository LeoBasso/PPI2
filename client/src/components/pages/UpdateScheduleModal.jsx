import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineEdit } from "react-icons/ai";
import { updateSchedule } from "../../queries/schedules/schedules";
import { CreateScheduleSchema } from "../../schemas/CreateScheduleSchema";
import FormSchedule from "../Form/FormSchedule";

const UpdateScheduleModal = ({ schedule = {} }) => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const [existingSchedules, setExistingSchedules] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: schedule.value?.date || "",
      hour: schedule.value?.hour || "",
    },
    resolver: yupResolver(CreateScheduleSchema),
  });
  const watchDate = watch("date");

  const openUpdateModal = () => setCreateModalOpen(true);
  const closeUpdateModal = () => setCreateModalOpen(false);

  const handlerUpdate = async (schedules) => {
    await updateSchedule(schedule.value.id, schedules);
    reset();
    closeUpdateModal();
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
        modalButton={<AiOutlineEdit className="text-[#6e776e]"/>}
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
            <FormSchedule
              name="hour"
              labelText="Hora"
              control={control}
              availableHours={availableHours}
              hasError={JSON.stringify(errors.hour?.message)}
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
