import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import IconsLeft from "../icons/left.png";
import IconsRight from "../icons/right.png";
import Calendar from "../icons/calendar.png";
import dayjs from "dayjs";

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const handleBeforeMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };
  return (
    <div className="headerbg">
      <header className="header">
        <img src={Calendar}></img>
        <h1 className="headerCalendar"> Calendar</h1>
        <button onClick={handleReset} className="todayButton">
          Today
        </button>
        <button onClick={handleBeforeMonth}>
          <img src={IconsLeft} className="beforeMonth"></img>
        </button>
        <button onClick={handleNextMonth}>
          <img src={IconsRight} className="nextMonth"></img>
        </button>
        <h2 className="monthAndYear">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>
    </div>
  );
};
