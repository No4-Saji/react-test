import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import type { State, TypeAndPayload } from "./ContextWrapper";

const GlobalContext = React.createContext<{
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  daySelected: Dayjs;
  setDaySelected: (day: Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (value: boolean) => void;
  showHolidayModal: boolean;
  setShowHolidayModal: (value: boolean) => void;
  dispatchCalEvent: React.Dispatch<TypeAndPayload>;
  savedEvents: State[];
  selectedEvent: null | State;
  setSelectedEvent: (evt: State) => void;
}>({
  monthIndex: 0,
  setMonthIndex: (): void => {},
  daySelected: dayjs(),
  setDaySelected: (): void => {},
  showEventModal: false,
  setShowEventModal: (): void => {},
  showHolidayModal: false,
  setShowHolidayModal: (): void => {},
  dispatchCalEvent: (): void => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: (): void => {},
});

export default GlobalContext;
