import { useState } from "react";
import DeleteServiceModal from "./DeleteServiceModal"
import UpdateServiceModal from "./UpdateServiceModal";


const Service = ({service}) => {

  return (
    <tr className="border-b dark:border-gray-700">

      <td className="px-4 py-3">{service.type}</td>
      <td className="px-6 py-4">{service.time} min</td>
      <td className="px-4 py-3">R$ {service.price} </td>

      <td className="flex-1 m-0 p-3 justify-end">
        <UpdateServiceModal value={service} />
      </td>
      <td className="flex-1 p-3">
        <DeleteServiceModal value={service} />
      </td>
    </tr>
  );
};

export default Service;
