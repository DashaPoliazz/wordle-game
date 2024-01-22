import { useEffect } from "react";
import "./optionBlock.css";

type Props = {
  title: string;
  description: string;
  isChecked: boolean;
  onOptionChange: (title: string) => void;
};

const OptionBlock = (props: Props) => {
  const { title, description, isChecked, onOptionChange } = props;

  const handleOptionClick = () => {
    onOptionChange(title);
  };

  return (
    <>
      <hr />
      <div className="option-block">
        <div className="option-block__left">
          <h3 className="option-block__title">{title}</h3>
          <p className="option-block__description">{description}</p>
        </div>
        <div className="option-block__right">
          <div className="center">
            <input
              onChange={handleOptionClick}
              checked={isChecked}
              type="checkbox"
              id="cbx"
              style={{ display: "none" }}
            />
            <label onClick={handleOptionClick} htmlFor="cbx" className="toggle">
              <span></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionBlock;
