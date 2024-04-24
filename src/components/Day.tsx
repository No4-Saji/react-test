import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import type { State } from "../context/ContextWrapper";

type Props = {
  day: dayjs.Dayjs;
  rowIdx: number;
};

export const Day = (props: Props) => {
  const { day, rowIdx } = props;
  const [dayEvents, setDayEvents] = useState<State[]>([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    useContext(GlobalContext);
  // 今日の日付を色付けする
  const getCurrentDayClass = (): boolean => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    // console.log(savedEvents);
    const events = savedEvents.filter(
      (evt) => dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="gridChild1">
      <header className="gridGrandChild1">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="dayOfWeek">{day.format("ddd")}</p>}
        <p className={getCurrentDayClass() ? "nowDay" : "child1OfText"}>
          {day.format("DD")}
        </p>
      </header>
      {dayEvents.map((evt, idx) => (
        <div
          key={idx}
          onClick={() => {
            setSelectedEvent(evt);
            setDaySelected(day);
            setShowEventModal(true);
          }}
          className={`scheduleIndicate`}
        >
          <p>{evt.title}</p>
          <p>
            Time: {evt.startTime} ~ {evt.finishTime}
          </p>
        </div>
      ))}
      <div
        className="daySelector"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        新規作成
      </div>
    </div>
  );
};
