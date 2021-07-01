import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../../css/RulesModal.css";

const RulesModal = ({ open, handleClose }) => {
  const classes = makeStyles(() => ({
    dialog: {
      display: "flex",
      background: "black",
      color: "#c0c0c0",
      borderRadius: "20px",
      border: "solid",
      borderColor: "#d4af37",
      borderWidth: "2px",
      width: "50%",
      height: "70%",
    },
    dialogTitle: {
      display: "flex",
      paddingBottom: "0px",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      alignSelf: "center",
      justifyContent: "flex-start",
      overflow: "scroll",
    },
    dialogActions: {
      display: "flex",
      width: "90%",
      alignSelf: "center",
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      margin: 8,
      "& label": { color: "#c0c0c0" },
      "& label.Mui-focused": { color: "#d5d5d5" },
      "& .MuiInputAdornment-root": { color: "#c0c0c0" },
      "& .MuiIconButton-label": { color: "#c0c0c0" },
      "& .MuiInputBase-input": { color: "#c0c0c0" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#c0c0c0" },
        "&:hover fieldset": { borderColor: "#d5d5d5" },
        "&.Mui-focused fieldset": { borderColor: "#d5d5d5" },
      },
    },
  }))();
  return (
    <Dialog classes={{ paper: classes.dialog }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
        Rules
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Point of Cards:</div>
          <table>
            <tr>
              <th style={{ fontSize: "18px", textAlign: "left" }}>Card</th>
              <th style={{ fontSize: "18px", textAlign: "left" }}>Point</th>
            </tr>
            <tr>
              <td>
                <img
                  src={require("../../cards/0.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
              </td>
              <td style={{ fontSize: "18px", textAlign: "left" }}>1 or 11</td>
            </tr>
            <tr>
              <td>
                <img
                  src={require("../../cards/1.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
                <span style={{ fontSize: "20px" }}> ... </span>
                <img
                  src={require("../../cards/8.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
              </td>
              <td style={{ fontSize: "18px", textAlign: "left" }}>2 ~ 9</td>
            </tr>
            <tr>
              <td>
                <img
                  src={require("../../cards/9.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
                <img
                  src={require("../../cards/10.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
                <img
                  src={require("../../cards/11.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
                <img
                  src={require("../../cards/12.png").default}
                  style={{ width: "50px", height: "50px", borderRadius: "18px" }}
                  alt="cards"
                ></img>
              </td>
              <td style={{ fontSize: "18px", textAlign: "left" }}>10</td>
            </tr>
          </table>
          <ul style={{ fontSize: "18px", textAlign: "left" }}>
            <li>The possible points of ( 2, J ) is [ 12 ].</li>
            <li>The possible points of ( A, 3 ) is [ 4, 14 ].</li>
            <li>The possible points of ( A, K, A ) is [ 12, 22, 32 ].</li>
          </ul>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Role:</div>
          <ul style={{ fontSize: "18px" }}>
            <li>Bank: The bank creates the room and battles with all coming players.</li>
            <li>Player: The player battles with the bank of the room.</li>
          </ul>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Basic Gameflow:</div>
          <ol style={{ fontSize: "18px" }}>
            <li>Every player can set the bet.</li>
            <li>
              After every player sets the bet, everbody gets two cards. One is visible to others, and the other is
              invisible.
            </li>
            <li>
              During the turn of each player, one can choose “HIT” to ask for one more visible card or choose “STAND” to
              end the turn.
            </li>
            <li>When all the players end their turns, the bank will show his hand cards.</li>
            <li>
              The bank can choose “HIT” to ask for one more visible card or choose “BATTLE” to battle with multiple
              players. The invisible card of the player will be visible after the battle.
            </li>
            <li>If all the players are battled with bank, the game is over.</li>
          </ol>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Rules of GameFlow:</div>
          <ol style={{ fontSize: "18px" }}>
            <li>The player can’t “STAND” until one of possible points is greater than 14.</li>
            <li>The player can’t “HIT” if the mininum of possible points is greater than 21.</li>
            <li>The player can’t “HIT” if the number of cards is 5.</li>
            <li>The bank can’t “BATTLE” untile one of possible points is greater than 14.</li>
            <li>The bank can’t “HIT” if the minimum of possible points is greater than 21.</li>
            <li>The bank can’t “HIT” if the number of cards is 5.</li>
          </ol>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Rules of Battle:</div>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Definition</div>
          <ul style={{ fontSize: "18px" }}>
            <li>Explosion Cards: minimum of possible points is greater than 21</li>
            <li>Special Combination: a combination that would multiply your result earning</li>
            <li>Normal Combination: if a combination os not special, it is normal</li>
          </ul>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Special Combination Bonus</div>
          <ul style={{ fontSize: "18px" }}>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 3</div>
              <div>Every Card is 7</div>
              <div>Bonus: 7 times of the bet</div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Possible points equal 21</div>
              <div>Bonus: 5 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Possible points is less than 21</div>
              <div>Bonus: 5 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards: 5</div>
              <div>Minimum possible points is greater than 21</div>
              <div>Bonus: -3 times of the bet</div>
              <div></div>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <div>Number of Cards less than 5</div>
              <div>Possible points equal 21</div>
              <div>Bonus: 2 times of the bet</div>
            </li>
          </ul>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Game Flow</div>
          <div style={{ fontSize: "18px" }}>The result is judged by the following rules sequentially</div>
          <ol style={{ fontSize: "18px" }}>
            <li>
              If the initial two cards of the bank are a special combination (e.g., (A, K), (A, Q)), all the players are
              forced to battle with the bank immediately, and the game is over.
            </li>
            <li>
              If the initial two cards of the player are a special combination (e.g., (A, K), (A, Q)), the bank is
              forced to battle with the player immediately.
            </li>
            <li>If both of the bank and the player have explosion cards, the result is a tie.</li>
            <li>
              If both the bank and the player have a special combination, the result will be the bonus difference times
              the bet.
            </li>
            <li>
              If neither of the bank and the player has special combination, the result is decided by the following
              rule.
              <ul>
                <li>If one of them has the explosion cards, the other wins the bet.</li>
                <li>If the bank and the player have the same points, the result is a tie.</li>
                <li>Otherwise, the one with the higher point wins the bet.</li>
              </ul>
            </li>
          </ol>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Examples</div>
          <div className="rules_match_box">
            <div className="rules_match_info">
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>Result: TIE</div>
              <div style={{ fontSize: "18px" }}> Bank</div>
              <div className="rcards">
                <img className="rcardFirst" src={require("../../cards/1.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/3.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/5.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/0.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/10.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px" }}>Exploded, Bonus: -3 times</div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Player</div>
              <div className="rcards other">
                <img className="rcard" src={require("../../cards/9.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/2.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/12.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px", textAlign: "end" }}>Exploded, Bonus: 0 times</div>
            </div>
          </div>
          <div className="rules_match_box">
            <div className="rules_match_info">
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>Result: Player loses 2 times of bet</div>
              <div style={{ fontSize: "18px" }}> Bank</div>
              <div className="rcards">
                <img className="rcardFirst" src={require("../../cards/5.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/6.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/7.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px" }}> Bonus: 2 times</div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Player</div>
              <div className="rcards other">
                <img className="rcard" src={require("../../cards/9.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/11.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Bonus: 0 times</div>
            </div>
          </div>
          <div className="rules_match_box">
            <div className="rules_match_info">
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>Result: Player wins 1 time of bet</div>
              <div style={{ fontSize: "18px" }}> Bank</div>
              <div className="rcards">
                <img className="rcardFirst" src={require("../../cards/1.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/8.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/10.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px" }}> Bonus: 2 times</div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Player</div>
              <div className="rcards other">
                <img className="rcard" src={require("../../cards/0.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/1.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/5.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/3.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/44.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Bonus: 3 times</div>
            </div>
          </div>
          <div className="rules_match_box">
            <div className="rules_match_info">
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>Result: Player loses 1 time of bet.</div>
              <div style={{ fontSize: "18px" }}> Bank</div>
              <div className="rcards">
                <img className="rcardFirst" src={require("../../cards/1.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/3.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/10.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px" }}> Bonus: 0 times</div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Player</div>
              <div className="rcards other">
                <img className="rcard" src={require("../../cards/9.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/4.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Bonus: 0 times</div>
            </div>
          </div>
          <div className="rules_match_box">
            <div className="rules_match_info">
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>Result: TIE</div>
              <div style={{ fontSize: "18px" }}> Bank</div>
              <div className="rcards">
                <img className="rcardFirst" src={require("../../cards/2.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/4.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/9.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px" }}> Bonus: 0 times</div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Player</div>
              <div className="rcards other">
                <img className="rcard" src={require("../../cards/6.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/8.png").default} alt="cards"></img>
                <img className="rcard" src={require("../../cards/1.png").default} alt="cards"></img>
              </div>
              <div style={{ fontSize: "18px", textAlign: "end" }}> Bonus: 0 times</div>
            </div>
          </div>
        </>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} style={{ color: "#03a9f4" }}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RulesModal;
