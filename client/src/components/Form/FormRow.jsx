import { useState } from "react";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

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
  const inputClass = `bg-[#fff7ed] border ${hasError ? "border-red-500" : "border-gray-300"
    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 ${hasError ? "focus:border-red-500" : "focus:border-primary-600"
    } block w-full p-2 placeholder-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 ${disabled ? "bg-gray-700 text-gray-600" : ""
    }`;

  const checkboxClass = `bg-[#fff7ed] border ${hasError ? "border-red-500" : "border-gray-300"
    } text-[#6e776e] text-sm rounded-md focus:ring-[#6e776e] ${hasError ? "focus:border-red-500" : "focus:border-primary-600"
    } inline-block w-auto p-2 cursor-pointer ${disabled ? "bg-gray-700 text-gray-600" : ""
    } w-4 h-4`;


  return (
    <div>
      <div className="mb-2 block">
        <label
          className={`block mb-2 text-sm font-medium ${hasError ? "text-red-700 dark:text-red-500" : "text-white"
            }`}
          htmlFor={name}
        >
          {labelText || name}
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
                ></div>
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
        ) : type === "checkbox" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex justify-center items-center mt-5">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  className={`${checkboxClass} transform scale-150`}
                  disabled={disabled}
                />
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
        ) : type === "tel" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <InputMask
                mask="(99) 99999-9999"
                name={field.name}
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                className={inputClass}
                disabled={disabled}
              />
            )}
          />
        ) : type === "hour" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                className={inputClass}
                disabled={disabled}
              >
                <option value="">Selecione o horário</option>
                {options.map((hour, index) => (
                  <option key={index} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
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
