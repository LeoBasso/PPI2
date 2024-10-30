import { useState } from "react";
import { Controller } from "react-hook-form";

const FormSchedule = ({ name, control, labelText, errors }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const inputClass = `bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder-gray-100 dark:focus:ring-primary-500 dark:focus:border-primary-500`;


   const generateTimeOptions = () => {
    const options = [];
    for (let hour = 13; hour <= 17; hour++) {
      options.push(
        <option key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>
          {`${hour.toString().padStart(2, '0')}:00`}
        </option>
      );
      options.push(
        <option key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>
          {`${hour.toString().padStart(2, '0')}:30`}
        </option>
      );
    }
    return options;
  };

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
                value={field.value}
                onChange={field.onChange}
                className={inputClass}
                onFocus={() => setIsSelectOpen(true)}
                onBlur={() => setIsSelectOpen(false)}
                size={isSelectOpen ? 5 : 1} // Muda o tamanho do select se aberto
              >
                <option value="">Clique para selecionar</option>
                {generateTimeOptions()}
              </select>
              {errors[name] && (
                <p className="error-message">
                  {errors[name].message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default FormSchedule;
