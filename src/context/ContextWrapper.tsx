import type { ReactNode } from "react";
import { useReducer, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

type Props = {
  children: ReactNode;
};

export type State = {
  title: string;
  date: string;
  startTime: string;
  finishTime: string;
  memo: string;
  day: Dayjs;
  id: number;
}[];

export type TypeAndPushPayload = {
  type: "push";
  payload: {
    title: string;
    date: string;
    startTime: string;
    finishTime: string;
    memo: string;
    day: Dayjs;
    id: number;
  };
};

export type TypeAndUpdatePayload = {
  type: "update";
  payload: {
    title: string;
    date: string;
    startTime: string;
    finishTime: string;
    memo: string;
    day: Dayjs;
    id: number;
  };
};

export type TypeAndDeletePayload = {
  type: "delete";
  payload: {
    title: string;
    date: string;
    startTime: string;
    finishTime: string;
    memo: string;
    day: Dayjs;
    id: number;
  };
};

type TypeAndPayload =
  | TypeAndPushPayload
  | TypeAndUpdatePayload
  | TypeAndDeletePayload;

const saveEventsReducer = (state: State, { type, payload }: TypeAndPayload) => {
  switch (type) {
    case "push":
      return [...state, payload];
    default:
      throw new Error();
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents: State = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper = (props: Props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    saveEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    // 以下構文でlocalStorageに保存
    // localStorage.setItem('key', 'value')
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
