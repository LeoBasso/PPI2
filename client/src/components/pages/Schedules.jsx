import { useEffect } from "react";
import { useFetchServices } from "../../queries/services/services";
import { useFetchUsers } from "../../queries/users/users";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import UpdateScheduleModal from "./UpdateScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";
import { updateSchedule } from "../../queries/schedules/schedules";

const Schedules = ({ schedule }) => {
  const { data: services } = useFetchServices();
  const { data: users } = useFetchUsers();
  const user = getUserFromLocalStorage();

  const service = services?.find(service => service?.id === schedule?.service_id);
  const scheduleUser = users?.find(u => u.id === schedule?.user_id);

  const handleAccept = async () => {
      const updatedSchedule = { id: schedule?.id, status: 'Aceito',
      }; await updateSchedule(schedule?.id, updatedSchedule);
  };

  const handleReject = async () => {
      const updatedSchedule = {id: schedule?.id, status: 'Recusado',
      }; await updateSchedule(schedule?.id, updatedSchedule);
  };

  return (
    <tr className="border-b dark:border-gray-700">
      {user?.role === 'admin' && (
        <td className="px-6 py-4">
          {scheduleUser ? scheduleUser?.name : 'Usuário não encontrado'}
        </td>
      )}
      <td className="px-4 py-3">{service?.type} </td>
      <td className="px-6 py-4">{schedule?.hour}h</td>
      <td className="px-4 py-3">{schedule?.date}</td>
      <td className="px-6 py-4">R$ {service?.price},00</td>
      <td className="px-6 py-4">{schedule?.status}</td>

      {user?.role === 'admin' && (
        <>
          {schedule?.status === 'Aceito' || schedule?.status === 'Recusado' ? (
            <td colSpan={2} className="px-6 py-4 text-center">-</td>
          ) : (
            <>
              <td className="px-6 py-4">
                <button
                  className="bg-[#6e776e] hover:bg-[#989f98] text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleAccept}
                >
                  Aceitar
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleReject}
                >
                  Recusar
                </button>
              </td>
            </>
          )}
        </>
      )}
      {user?.role === 'admin' && (
        <td className="px-6 py-4">
          <UpdateScheduleModal value={schedule} />
        </td>
      )}
      {user?.role === 'admin' && (
        <td className="px-6 py-4">
          <DeleteScheduleModal value={schedule} />
        </td>
      )}
    </tr>
  );
};

export default Schedules;
