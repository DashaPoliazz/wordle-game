import React from "react";
import { Letter } from "../letter/Letter";
import "./guidance.css";
import {
  CLOSE_WORD_GUESS,
  CORRECT_GUESS,
  GUIDANCE__WORD,
} from "../../constants";

type Props = {};

const Guidance = (props: Props) => {
  const wordExample = () => {
    return [...GUIDANCE__WORD].map((char, idx) => (
      <Letter
        char={char}
        letterElsewhere={idx === 1 || idx === 3}
        letterCorrect={idx === GUIDANCE__WORD.length - 1}
      />
    ));
  };
  const closeWordGuess = () => {
    return [...CLOSE_WORD_GUESS].map((char, idx) => (
      <Letter char={char} letterCorrect={idx < 3} />
    ));
  };
  const correctWordGuess = () => {
    return [...CORRECT_GUESS].map((char) => (
      <Letter char={char} letterCorrect={true} />
    ));
  };

  return (
    <div className="info">
      <article className="info__article">
        <p className="info__text">
          You have to guess the hidden word in 6 tries and the color of the
          letters changes to show how close you are.
        </p>
        <p className="info__text">
          To start the game, just enter any word, for example:
        </p>
        <div className="info__example">{wordExample()}</div>
        <div className="info__explanation">
          <div className="info__explanation--group">
            <b className="info--grey-text">T</b>,{" "}
            <b className="info--grey-text">B</b> aren't in the target word at
            all.
          </div>
          <br />
          <div className="info__explanation--group">
            <b className="info--yellow-text">A</b>,{" "}
            <b className="info--yellow-text">L</b> is in the word but in the
            wrong spot.
          </div>
          <br />
          <b className="info--green-text">E</b> is in the word and in the
          correct spot.
          <br />
        </div>
        <p className="info__text">
          Another try to find matching letters in the target word.
        </p>
        <div className="info__example">{closeWordGuess()}</div>
        <p className="info__text">So close!</p>
        <div className="info__example">{correctWordGuess()}</div>
        <p className="info__text">Got it! 🏆</p>
      </article>
    </div>
  );
};

export default Guidance;
