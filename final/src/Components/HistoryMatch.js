import "../css/HistoryModal.css";

const HistoryMatch = ({ username, bank, player, bet, resultTimes }) => {
  const bankImgs = bank.cards.map((card) => {
    return require("../cards/" + (card.number % 52) + ".png").default;
  });
  const playerImgs = player.cards.map((card) => {
    return require("../cards/" + (card.number % 52) + ".png").default;
  });
  if (username === bank.name) {
    return (
      <div className="history_match_box">
        <div className="history_match_info">
          <div style={{ marginLeft: "4%", fontSize: "24px" }}> {player.name}</div>
          <div className="hcards">
            {playerImgs.map((img) => (
              <img className="hcard" src={img} alt="cards"></img>
            ))}
          </div>
          <div style={{ fontSize: "24px", textAlign: "end" }}> {bank.name}</div>
          <div className="hcards other">
            {bankImgs.map((img) => (
              <img className="hcard" src={img} alt="cards"></img>
            ))}
          </div>
          <div style={{ fontSize: "20px" }}>Bet: {bet}</div>
          <div style={{ fontSize: "20px" }}>Result: {-bet * resultTimes}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="history_match_box">
        <div className="history_match_info">
          <div style={{ fontSize: "24px" }}> {bank.name}</div>
          <div className="hcards">
            {bankImgs.map((img) => (
              <img className="hcard" src={img} alt="cards"></img>
            ))}
          </div>
          <div style={{ fontSize: "24px", textAlign: "end" }}> {player.name}</div>
          <div className="hcards other">
            {playerImgs.map((img) => (
              <img className="hcard" src={img} alt="cards"></img>
            ))}
          </div>
          <div style={{ fontSize: "20px" }}>Bet: {bet}</div>
          <div style={{ fontSize: "20px" }}>Result: {bet * resultTimes}</div>
        </div>
      </div>
    );
  }
};
export default HistoryMatch;
