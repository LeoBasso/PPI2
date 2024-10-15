import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormRow from "../Form/FormRow";
import OpenCloseModal from "../modal/OpenCloseModal";
import ClearButtonForm from "../Buttons/ClearButtonForm";
import SubmitButton from "../Buttons/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchedule } from "../../queries/schedules/schedules";
import { CreateScheduleSchema } from "../../schemas/CreateScheduleSchema";
import { useFetchServices } from "../../queries/services/services";
import FormSelectObject from "../Form/FormSelectObject";

const CreateScheduleModal = () => {
  const [isModalCreateOpen, setCreateModalOpen] = useState(false);
  const { data: services } = useFetchServices();

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
      service_id: "",
    },
    resolver: yupResolver(CreateScheduleSchema),
  });

  const serviceOptions = services
    ? [
        {
          value: '',
          label: 'Selecione',
        },
        ...services.map((service) => ({
          value: service.id,
          label: service.type,
        })),
      ]
    : [];
    
  function openCreateModal() {
    setCreateModalOpen(true);
  }

  function closeCreateModal() {
    setCreateModalOpen(false);
  }

  const handlerCreate = async (propertys) => {
    console.log(propertys);
    setCreateModalOpen(false);
    await createSchedule(propertys);
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
            <FormSelectObject
              type="select"
              name="service_id"
              labelText="Serviço"
              options={serviceOptions}
              control={control}
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

export default CreateScheduleModal;
