import { useState, useContext } from "react";
import { MdDeleteForever, MdClose, MdTitle } from "react-icons/md";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";

export const EventModal = () => {
  const {
    daySelected,
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
    showEventModal,
    showHolidayModal,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState<string>(
    selectedEvent ? selectedEvent.title : ""
  );

  const [startTime, setStartTime] = useState<string>(
    selectedEvent ? selectedEvent.startTime : ""
  );

  const [finishTime, setFinishTime] = useState<string>(
    selectedEvent ? selectedEvent.finishTime : ""
  );

  const [date, setDate] = useState<string>(
    selectedEvent ? selectedEvent.date : ""
  );

  const [memo, setMemo] = useState<string>(
    selectedEvent ? selectedEvent.memo : ""
  );

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
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (!title || !date) {
      alert("必須項目（タイトル、日付）が未入力です。");
    } else {
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }
      setShowEventModal(false);
    }
  };

  return (
    <>
      {showEventModal && !showHolidayModal && (
        <div className="modalWindow">
          <form className="modalWindowOfLayout">
            <header className="modalHeader">
              <div className="modalIcon">
                <button
                  className="modalClose"
                  onClick={() => setShowEventModal(false)}
                >
                  <MdClose />
                </button>
                {selectedEvent && (
                  <button
                    className="modalDelete"
                    onClick={() => {
                      dispatchCalEvent({
                        type: "delete",
                        payload: selectedEvent,
                      });
                      setShowEventModal(false);
                    }}
                  >
                    <MdDeleteForever />
                  </button>
                )}
              </div>
            </header>
            <div className="paddingModal">
              <div className="gridOfModal">
                <div> </div>
                <p className="modalDay">
                  {daySelected?.format("YYYY/MM/DD") ?? "NULL"}
                </p>
                <input
                  type="text"
                  name={title}
                  maxLength={10}
                  required
                  placeholder="タイトルを入力"
                  value={title}
                  className="modalTitle"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="date"
                  name="dateSelector"
                  aria-required
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
                <textarea
                  name="memo"
                  placeholder="memo"
                  value={memo}
                  className="modalMemo"
                  maxLength={255}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>
            </div>
            <footer className="modalFooter">
              <button
                type="submit"
                onClick={handleSubmit}
                className="saveButton"
              >
                Save
              </button>
            </footer>
          </form>
        </div>
      )}
      {showEventModal && showHolidayModal && (
        <div className="modalWindow">
          <form className="modalWindowOfLayout">
            <header className="modalHeader">
              <div className="modalIcon">
                <button
                  className="modalClose"
                  onClick={() => setShowEventModal(false)}
                >
                  <MdClose />
                </button>
              </div>
            </header>
            <div className="paddingModal">
              <div className="gridOfModal">
                <div className="modalHoliday">
                  <p className="holidayDateIcon">
                    <FaRegCalendarAlt />
                    <span className="modalHolidayDate">
                      {daySelected?.format("YYYY/MM/DD") ?? "NULL"}
                    </span>
                  </p>

                  <p className="holidayTitleIcon">
                    <MdTitle />
                    <span className="modalHolidayName">{title}</span>
                  </p>

                  <p className="holidayTimeIcon">
                    <FaRegClock />
                    <span className="modalHolidayTime">終日</span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
