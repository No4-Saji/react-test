import React from "react";
import { Day } from "./Day";
import type dayjs from "dayjs";

type Props = {
  month: dayjs.Dayjs[][];
};

export const Month = (props: Props) => {
  const { month } = props;
  return (
    <div className="gridparent">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
