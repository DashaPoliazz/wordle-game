import "./message.css";
import { MESSAGE_TYPE } from "../../types/types";

type Props = {
  type: MESSAGE_TYPE;
};

const Message = ({ type }: Props) => {
  let message = "";

  switch (type) {
    case MESSAGE_TYPE.WIN:
      message = "You Won! 🏆";
      break;
    case MESSAGE_TYPE.LOSE:
      message = "You Lose! 😔";
      break;
  }

  return (
    <div className="message">
      <b>{message}</b>
    </div>
  );
};

export default Message;
