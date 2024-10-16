import React from "react";
import ScheduleCalendar from "../../../components/pages/ScheduleCalendar";
import { useFetchSchedules } from "../../../queries/schedules/schedules";

const Calendar = () => {
  const { data: schedules } = useFetchSchedules();

  return (
    <div>
      <h1 className="text-xl font-bold mb-10">Calendário de Agendamentos</h1>
      {schedules ? (
        <ScheduleCalendar schedules={schedules} />
      ) : (
        <p>Carregando agendamentos...</p>
      )}
    </div>
  );
};

export default Calendar;
