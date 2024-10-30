import { useState } from "react";
import { updateUser } from "../../queries/users/users";

const Users = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(user.role === "ADMIN");

  const handleToggle = async () => {
    const newRole = isAdmin ? "USER" : "ADMIN";
    setIsAdmin(!isAdmin);

    await updateUser(user.id, { role: newRole });
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-4 py-3">{user.number}</td>
      <td className="px-4 py-3 flex items-center gap-2">
        <span>{isAdmin ? "Admin" : "User"}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></span>
        </label>
      </td>
    </tr>
  );
};

export default Users;
