"use client";

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ko from "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeData from "dayjs/plugin/localeData";
import { Button } from "./ui/button";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.locale(ko);

const Calendar = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [arrivalDay, setArrivalDay] = useState<null | Dayjs>(null);
  const [leavingDay, setLeavingDay] = useState<null | Dayjs>(null);

  const selectDay = ({ day }: { day: Dayjs }) => {
    if (
      arrivalDay === null ||
      arrivalDay?.isAfter(day) ||
      arrivalDay.isSame(day)
    ) {
      setArrivalDay(day);
      setLeavingDay(null);
    } else if (leavingDay === null) {
      setLeavingDay(day);
    } else {
      setArrivalDay(day);
      setLeavingDay(null);
    }
  };

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

  const segmentClasses =
    "h-full w-full p-4 flex justify-center items-center transition-all";

  const dayClasses = ({ day, index }: { day: Dayjs; index: number }) => {
    const isArrivalDay = day.isSame(arrivalDay);
    const isBetweenJourney =
      day.isAfter(arrivalDay) && day.isBefore(leavingDay);
    const isLeavingDay = day.isSame(leavingDay);
    const isCurrentMonth = day.month() === currentDay.month();

    return classNames("calendar-day", "hover:bg-stone-500", segmentClasses, {
      "text-stone-200": !isCurrentMonth,
      "rounded-l-2xl": index % 7 === 0 || isArrivalDay,
      "rounded-r-2xl":
        index % 7 === 6 ||
        isLeavingDay ||
        (isArrivalDay && leavingDay === null),
      "bg-stone-700 text-stone-50":
        isArrivalDay || isBetweenJourney || isLeavingDay,
    });
  };

  return (
    <div className='calendar p-2 flex flex-col gap-12 border border-stone-400 rounded-xl relatve'>
      <div className='calendar-header flex justify-between gap-4 items-center'>
        <Button
          variant='ghost'
          onClick={() => setCurrentDay(currentDay.subtract(1, "month"))}
        >
          <FaChevronLeft />
        </Button>
        <div className='calendar-header text-2xl font-semibold'>
          {currentDay.format("YYYY년 MMMM")}
        </div>
        <Button
          variant='ghost'
          onClick={() => setCurrentDay(currentDay.add(1, "month"))}
        >
          <FaChevronRight />
        </Button>
      </div>
      <div className='calendar-grid grid grid-cols-7 grid-rows-6 p-4 gap-y-2'>
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
            className={dayClasses({ day, index })}
            onMouseDown={() => selectDay({ day })}
          >
            <div>{day.date()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
