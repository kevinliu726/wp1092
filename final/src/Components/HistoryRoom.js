import "../css/HistoryModal.css";

const HistoryRoom = ({ room_name, host, date, goIntoDetail }) => {
  return (
    <div className="history_room_box" onClick={goIntoDetail}>
      <div className="history_room_info">
        <div style={{ display: "flex", fontSize: "24px" }}> {room_name}</div>
        <div style={{ fontSize: "20px", textAlign: "end" }}>Host: {host}</div>
        <div style={{ textAlign: "end" }}>{date}</div>
      </div>
    </div>
  );
};
export default HistoryRoom;
