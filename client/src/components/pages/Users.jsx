import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { updateUser } from "../../queries/users/users";
import DeleteUserModal from "./DeleteUserModal"

const Users = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState(user.role === "admin");
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsAdmin(user.role === "admin");
  }, [user.role]);

  const handleToggle = async () => {
    const newRole = isAdmin ? "user" : "admin";
    setIsAdmin(!isAdmin);
    await updateUser(user.id, { role: newRole });
    queryClient.invalidateQueries("users");
    setIsAdmin(isAdmin);
  };

  const formatPhoneNumber = (number) => {
    if (!number) return "";
    const cleaned = number.toString().replace(/\D/g, "");
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-4 py-3">{formatPhoneNumber(user.number)}</td>
      <td className="px-4 py-3 flex items-center gap-2 mt-2">
  <span>{isAdmin ? "admin" : "user"}</span>
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isAdmin}
      onChange={handleToggle}
      className="sr-only peer"
    />
    <div className="w-10 h-5 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#b6bbb6] dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:bg-[#6e776e]"></div>
    <span className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
  </label>
</td>

      <td className="flex-1 p-3">
        <DeleteUserModal value={user} />
      </td>
    </tr>
  );
};

export default Users;
