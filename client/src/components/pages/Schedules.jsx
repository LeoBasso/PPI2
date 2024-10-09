import { useEffect } from "react";
import { useFetchServices } from "../../queries/services/services";

const Schedules = ({ schedule }) => {
  const { data: services } = useFetchServices();

  console.log(schedule);
  console.log(services);
  
  
  const service = services?.find(service => service?.id === schedule?.service_id);

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{service?.type} </td>
      <td className="px-6 py-4">{schedule?.hour}h</td>
      <td className="px-4 py-3">{schedule?.date}</td>
      <td className="px-6 py-4">R$ {service?.price},00</td>
      <td className="px-6 py-4">{schedule?.status}</td>
    </tr>
  );
};

export default Schedules;
