import React from "react";
import ScheduleCalendar from "../../../components/pages/ScheduleCalendar";
import { useFetchSchedules } from "../../../queries/schedules/schedules";

const Calendar = () => {
  const { data: schedules } = useFetchSchedules();

  return (
    <div className="mb-10 mt-10">
      {schedules ? (
        <ScheduleCalendar schedules={schedules} />
      ) : (
        <p>Carregando agendamentos...</p>
      )}
    </div>
  );
};

export default Calendar;
