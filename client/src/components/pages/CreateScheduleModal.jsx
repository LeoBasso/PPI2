import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchedule } from "../../queries/schedules/schedules";
import { CreateScheduleSchema } from "../../schemas/CreateScheduleSchema";
import { useFetchServices } from "../../queries/services/services";
import FormSelectObject from "../Form/FormSelectObject";
import { ScheduleHours } from "../../arrays/ScheduleHours";
import moment from "moment";
import { toast } from "react-toastify";

const CreateScheduleModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const { data: services = [] } = useFetchServices();

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      date: "",
      hour: "",
      status: 'Pendente',
      service_id: "",
    },
    resolver: yupResolver(CreateScheduleSchema),
  });

  const serviceOptions = [
    { value: '', label: 'Selecione' },
    ...services.map(service => ({ value: service.id, label: service.type })),
  ];

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const handlerCreate = async (formData) => {
    const formattedDate = moment(formData.date).format('YYYY-MM-DD');
    formData.date = formattedDate;

    const dayOfWeek = moment(formData.date).day();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toast.error('Não é possível criar agendamentos aos sábados e domingos');
      return;
    }

    const selectedService = services.find(service => service.id === formData.service_id);
    if (selectedService && selectedService.autoschedule) {
      formData.status = "Aceito";
    }

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
            <FormRow
              type="hour"
              name="hour"
              labelText="Selecione o horário"
              control={control}
              hasError={JSON.stringify(errors.hour?.message)}
              options={ScheduleHours}
              disabled={false}
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
