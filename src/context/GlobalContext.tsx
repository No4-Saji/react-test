import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import type { State, TypeAndPushPayload } from "./ContextWrapper";

const GlobalContext = React.createContext<{
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  daySelected: Dayjs;
  setDaySelected: (day: Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (value: boolean) => void;
  dispatchCalEvent: React.Dispatch<TypeAndPushPayload>;
  savedEvents: State;
}>({
  monthIndex: 0,
  setMonthIndex: (): void => {},
  daySelected: dayjs(),
  setDaySelected: (): void => {},
  showEventModal: false,
  setShowEventModal: (): void => {},
  dispatchCalEvent: (): void => {},
  savedEvents: [],
});

export default GlobalContext;
