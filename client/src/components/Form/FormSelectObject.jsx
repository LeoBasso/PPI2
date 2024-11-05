import { useState } from 'react';
import { Controller } from 'react-hook-form';

const FormSelectObject = ({ name, control, labelText, options, onChange, hasError }) => {
  const inputClass = `bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500 ${hasError ? "border-red-500" : "border-gray-300"
    } text-gray-900 text-sm rounded-lg focus:ring-primary-600 ${hasError ? "focus:border-red-500" : "focus:border-primary-600"
    }`;
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
              <select
                name={field.name}
                value={field.label}
                onChange={onChange ? onChange : field.onChange}
                className={inputClass}
              > 
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        />{hasError && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">{hasError}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormSelectObject;
