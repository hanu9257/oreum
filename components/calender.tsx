"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ko from "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeData from "dayjs/plugin/localeData";
import { Button } from "./ui/button";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.locale(ko);

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [arrivalDay, setArrivalDay] = useState<null | Dayjs>(null);
  const [leavingDay, setLeavingDay] = useState<null | Dayjs>(null);

  function selectDay({ day }: { day: Dayjs }) {
    if (
      arrivalDay === null ||
      arrivalDay?.isAfter(day) ||
      arrivalDay.isSame(day)
    ) {
      setArrivalDay(day);
    } else if (leavingDay === null) {
      setLeavingDay(day);
    } else {
      setArrivalDay(day);
      setLeavingDay(null);
    }
  }

  const weekdays = dayjs.weekdaysShort();
  const startOfMonth = currentDay.startOf("month");
  const endOfMonth = currentDay.endOf("month");

  const startDay = startOfMonth.isoWeekday();
  const endDay = endOfMonth.isoWeekday();

  const daysInMonth = currentDay.daysInMonth();

  // 이전 달의 날짜 계산
  const prevMonthDays = [];
  for (let i = startDay - 1; i > 0; i--) {
    prevMonthDays.push(startOfMonth.subtract(i, "day"));
  }

  // 이번 달의 날짜 계산
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(startOfMonth.date(i));
  }

  // 다음 달의 날짜 계산
  const nextMonthDays = [];
  for (let i = 1; i <= 7 - endDay; i++) {
    nextMonthDays.push(endOfMonth.add(i, "day"));
  }

  const calendarDays = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ];

  const segmentClasses = "h-full w-full p-8 flex justify-start items-center";

  return (
    <div className='calendar p-8 flex flex-col gap-12'>
      <div className='calendar-header flex gap-4 items-center'>
        <Button onClick={() => setCurrentDay(currentDay.subtract(1, "month"))}>
          이전달
        </Button>
        <Button onClick={() => setCurrentDay(currentDay.add(1, "month"))}>
          다음달
        </Button>
        <div className='calendar-header text-2xl'>
          {currentDay.format("YYYY년 MMMM")}
        </div>
      </div>
      <div className='calendar-grid grid grid-cols-7 auto-rows-[4rem] p-4'>
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className={`
              ${segmentClasses}
              ${weekday === "토" ? "text-blue-500" : ""}
              ${weekday === "일" ? "text-red-500" : ""}`}
          >
            {weekday}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day 
              ${segmentClasses}
              ${day.month() !== currentDay.month() ? "text-gray-200" : ""}
              ${day.isSame(arrivalDay) ? "bg-green-200" : ""}
              ${
                day.isAfter(arrivalDay) && day.isBefore(leavingDay)
                  ? "bg-violet-200"
                  : ""
              }
              ${day.isSame(leavingDay) ? "bg-cyan-200" : ""}
              `}
            onMouseDown={() => selectDay({ day })}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
