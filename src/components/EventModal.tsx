import { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";

export const EventModal = () => {
  const { daySelected, setShowEventModal, dispatchCalEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState<string>("");

  const [startTime, setStartTime] = useState<string>("");

  const [finishTime, setFinishTime] = useState<string>("");

  const [date, setDate] = useState<string>("");

  const [memo, setMemo] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // クリック時に送信するというdefaultの動作をキャンセルする
    e.preventDefault();
    const calendarEvent = {
      title: title,
      date: date,
      startTime: startTime,
      finishTime: finishTime,
      memo: memo,
      day: daySelected,
      id: Date.now(),
    };
    dispatchCalEvent({ type: "push", payload: calendarEvent });
    setShowEventModal(false);
  };

  return (
    <div className="modalWindow">
      <form className="modalWindowOfLayout">
        <header className="modalHeader">
          <div className="modalClose">
            <button onClick={() => setShowEventModal(false)}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="paddingModal">
          <div className="gridOfModal">
            <div> </div>
            <p className="modalDay">
              {daySelected?.format("YYYY, MMMM DD") ?? "NULL"}
            </p>
            <input
              type="text"
              name="title"
              maxLength={10}
              placeholder="Add title"
              value={title}
              required
              className="modalTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              name="dateSelector"
              value={date}
              className="modalDate"
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="modal-start-time">開始時刻</label>
            <input
              type="time"
              name="startTime"
              value={startTime}
              required
              className="modalTime"
              id="modal-start-time"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="modal-finish-time">終了時刻</label>
            <input
              type="time"
              name="finishTime"
              value={finishTime}
              required
              className="modalTime"
              id="modal-finish-time"
              onChange={(e) => setFinishTime(e.target.value)}
            />
            <input
              type="text"
              name="memo"
              placeholder="Add memo"
              value={memo}
              className="modalMemo"
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>
        <footer className="modalFooter">
          <button type="button" onClick={handleSubmit} className="saveButton">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
