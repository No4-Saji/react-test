import { useContext, useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

type Props = {
  day: dayjs.Dayjs;
  rowIdx: number;
};

type State = {
  title: string;
  startTime: string;
  finishTime: string;
  day: Dayjs;
  id: number;
}[];

export const Day = (props: Props) => {
  const { day, rowIdx } = props;
  const [dayEvents, setDayEvents] = useState<State>([]);
  const { setDaySelected, setShowEventModal, savedEvents } =
    useContext(GlobalContext);
  // 今日の日付を色付けする
  const getCurrentDayClass = (): boolean => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  };

  // 登録データを日付が一致する日に表示
  useEffect(() => {
    // console.log(savedEvents);
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
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
        <div key={idx} className={`scheduleIndicate`}>
          {evt.title}
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
