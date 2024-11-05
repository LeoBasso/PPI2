import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchedule, fetchSchedulesByDate } from "../../queries/schedules/schedules";
import { CreateScheduleSchema } from "../../schemas/CreateScheduleSchema";
import { useFetchServices } from "../../queries/services/services";
import FormSelectObject from "../Form/FormSelectObject";
import FormSchedule from "../Form/FormSchedule";

const CreateScheduleModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const { data: services = [] } = useFetchServices();
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
      date: "",
      hour: "",
      status: 'Pendente',
      service_id: "",
    },
    resolver: yupResolver(CreateScheduleSchema),
  });

  const watchDate = watch("date");

  useEffect(() => {
    if (watchDate) {
      fetchSchedulesByDate(watchDate).then(setExistingSchedules);
    }
  }, [watchDate]);

  useEffect(() => {
    const occupiedHours = existingSchedules.map(schedule => schedule.hour);
    const allHours = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];
    const filteredHours = allHours.filter(hour => !occupiedHours.includes(hour));
    setAvailableHours(filteredHours);
  }, [existingSchedules]);

  const serviceOptions = [
    { value: '', label: 'Selecione' },
    ...services.map(service => ({ value: service.id, label: service.type })),
  ];

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const handlerCreate = async (formData) => {
    await createSchedule(formData);
    reset();
    closeCreateModal();
  };

  return (
    <div className="flex items-center justify-center">
      <OpenCloseModal
        isModalOpen={isModalCreateOpen}
        openModal={openCreateModal}
        closeModal={closeCreateModal}
        modalName={"Solicitar agendamento"}
        modalButton={"Solicitar agendamento"}
        classStyle={true}
        backdrop={false}
        colorText={"text-gray-300"}
      >
        <form onSubmit={handleSubmit(handlerCreate)}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <FormRow
              type="date"
              name="date"
              labelText="Data"
              placeholder="Data"
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
            <FormSelectObject
              name="service_id"
              control={control}
              labelText="Serviço"
              options={serviceOptions}
              hasError={JSON.stringify(errors.service_id?.message)}
            />
          </div>
          <div className="relative inline-flex items-center justify-center">
            <ClearButtonForm onClick={reset} />
            <SubmitButton label="Enviar" />
          </div>
        </form>
      </OpenCloseModal>
    </div>
  );
};

export default CreateScheduleModal;
