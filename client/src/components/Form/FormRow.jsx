import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";

const FormRow = ({
  type,
  name,
  labelText,
  placeholder,
  control,
  hasError,
  options,
  disabled,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const inputClass = `bg-[#fff7ed] border ${
    hasError ? "border-red-500" : "border-gray-300"
  } text-gray-900 text-sm rounded-lg focus:ring-primary-600 ${
    hasError ? "focus:border-red-500" : "focus:border-primary-600"
  } block w-full p-2 placeholder-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
    disabled ? "bg-gray-700 text-gray-600" : ""
  }`;

  return (
    <div>
      <div className="mb-2 block">
        <label
          className={`block mb-2 text-sm font-medium ${
            hasError ? "text-red-700 dark:text-red-500" : "text-white"
          }`}
          htmlFor={name}
        >
          {labelText || name}{" "}
        </label>
        {type === "select" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="relative">
                <div
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                >
                </div>
                <select
                  name={field.name}
                  value={field.value}
                  placeholder={placeholder}
                  onChange={field.onChange}
                  className={inputClass}
                  disabled={disabled}
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  onBlur={() => setIsSelectOpen(false)}
                >
                  <option value="">Selecione</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
        ) : type === "date" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                type="date"
                name={field.name}
                onChange={field.onChange}
                className={inputClass}
                {...field}
                disabled={disabled}
              />
            )}
          />
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <input
                type={type}
                name={field.name}
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                className={inputClass}
                disabled={disabled}
              />
            )}
          />
        )}
        {hasError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">{hasError}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormRow;
