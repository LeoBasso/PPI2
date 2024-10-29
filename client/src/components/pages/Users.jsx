import { useState } from "react";

const Users = ({user}) => {

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-4 py-3">{user.number}</td>
      <td className="px-4 py-3">{user.role}</td>
    </tr>
  );
};

export default Users;
