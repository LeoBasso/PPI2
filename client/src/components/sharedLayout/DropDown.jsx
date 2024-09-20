import { useState } from "react";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DropDown = () => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const user = getUserFromLocalStorage();
  const navigate = useNavigate();
  const toggleDropDown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const logout = () => {
    removeUserFromLocalStorage();
    toast.success("Saindo");
    navigate("/login");
  };

  return (
    <div className="relative mr-20 pr-2">
      <button
        id="dropdownAvatarNameButton"
        onClick={toggleDropDown}
        className="flex items-center text-sm font-medium text-orange-500 rounded-full hover:text-orange-700 md:mr-0 mt-12 pr-8"
        type="button"
      >
        <Avatar alt="User settings" img="" rounded stacked />
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transform ${
            isDropDownOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdownAvatarName"
        className={`${
          isDropDownOpen ? "block" : "hidden"
        } absolute z-10 bg-[#1c1917] divide-y divide-gray-100 rounded-lg shadow w-44 mt-2 right-0`}
      >
        <div className="px-4 py-3 text-sm text-white">
          <div className="font-medium">{user.name}</div>
          <div className="truncate mt-2">{user.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-white hover:bg-[#f97316]"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          <li>
            <a href="/profile" className="block hover:text-black">
              Perfil
            </a>
          </li>
        </ul>
        <div className="py-2 text-sm text-white hover:bg-[#f97316]">
          <button onClick={logout}>Sair</button>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
