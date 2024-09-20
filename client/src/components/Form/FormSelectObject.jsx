import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from 'react-icons/hi';

const FormSelectObject = ({ name, control, labelText, options, onChange }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const inputClass = `bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500`;

  return (
    <div>
      <div className="mb-2 block">
        <label
          className="block mb-2 text-sm font-medium text-white"
          htmlFor={name}
        >
          {labelText || name}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="relative">
              <div
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                {isSelectOpen ? (
                  <HiOutlineArrowNarrowUp className="h-4 w-4 text-gray-900" />
                ) : (
                  <HiOutlineArrowNarrowDown className="h-4 w-4 text-gray-900" />
                )}
              </div>
              <select
                name={field.name}
                value={field.label}
                onChange={onChange ? onChange : field.onChange}
                className={inputClass}
              >
                <option value="">Selecione</option>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FormSelectObject;
