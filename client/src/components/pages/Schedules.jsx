import { useEffect } from "react";
import { useFetchServices } from "../../queries/services/services";
import { useFetchUsers } from "../../queries/users/users";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import UpdateScheduleModal from "./UpdateScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";

const Schedules = ({ schedule }) => {
  const { data: services } = useFetchServices();
  const { data: users } = useFetchUsers();

  const user = getUserFromLocalStorage();

  const service = services?.find(service => service?.id === schedule?.service_id);
  const scheduleUser = users?.find(u => u.id === schedule?.user_id);

  return (
    <tr className="border-b dark:border-gray-700">
      {user?.role == 'admin' && (
        <td className="px-6 py-4">
         {scheduleUser ? scheduleUser?.name : 'Usuário não encontrado'}
        </td>
      )}
      <td className="px-4 py-3">{service?.type} </td>
      <td className="px-6 py-4">{schedule?.hour}h</td>
      <td className="px-4 py-3">{schedule?.date}</td>
      <td className="px-6 py-4">R$ {service?.price},00</td>
      <td className="px-6 py-4">{schedule?.status}</td>
      {user?.role == 'admin' && (
        <td className="px-6 py-4">
          <UpdateScheduleModal value={schedule}/>
        </td>
      )}
      {user?.role == 'admin' && (
        <td className="px-6 py-4">
          <DeleteScheduleModal value={schedule}/>
        </td>
      )}
    </tr >
  )
};

export default Schedules;
