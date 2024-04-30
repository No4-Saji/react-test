import { useContext, useEffect, useState, useMemo } from "react";
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
  const [apiDataKeys, setApiDataKeys] = useState<string[]>([]);
  const [apiDataValues, setApiDataValues] = useState<string[]>([]);
  const {
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectedEvent,
    setShowHolidayModal,
  } = useContext(GlobalContext);

  //祝日のデータを取得
  const apiUrl = "https://holidays-jp.github.io/api/v1/date.json";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTPエラー！ステータスコード: ${response.status}`);
      }
      console.log("response", response.body);
      return response.json();
    })
    .then((data) => {
      setApiDataKeys(Object.keys(data as object));
      setApiDataValues(Object.values(data as object));
    })
    .catch((error) => {
      console.error("データの取得中にエラーが発生しました:", error);
    });

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

  const holidayName: string = useMemo(() => {
    let holiday = "";
    for (let i = 0; i < apiDataKeys.length; i++)
      if (apiDataKeys[i] === day.format("YYYY-MM-DD")) {
        holiday = apiDataValues[i];
      }
    return holiday;
  }, [apiDataKeys, apiDataValues, day]);

  return (
    <div className="gridChild1">
      <header className="gridGrandChild1">
        {/* 1行目に曜日を表示 */}
        {rowIdx === 0 && <p className="dayOfWeek">{day.format("ddd")}</p>}
        <p className={getCurrentDayClass() ? "nowDay" : "child1OfText"}>
          {day.format("DD")}
        </p>
      </header>
      <div
        onClick={() => {
          setSelectedEvent({
            title: holidayName,
            date: day.format("YYYY-MM-DD"),
            startTime: "",
            finishTime: "",
            memo: "",
            day: day,
            id: Date.now(),
          });
          setDaySelected(day);
          setShowEventModal(true);
          setShowHolidayModal(true);
        }}
      >
        <p className="holidayName">{holidayName}</p>
      </div>

      {dayEvents.map((evt, idx) => (
        <div
          key={idx}
          onClick={() => {
            setSelectedEvent(evt);
            setDaySelected(day);
            setShowEventModal(true);
            setShowHolidayModal(false);
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
          setShowHolidayModal(false);
        }}
      >
        新規作成
      </div>
    </div>
  );
};
