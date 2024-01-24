export const getDefaultOptions = () => [
  {
    title: "Hard mode",
    description: "Turning off color hints and 'Backspace' button",
    isChecked: false,
  },
  {
    title: "Light mode",
    description: "Guess the word from the random-positioned letters",
    isChecked: false,
  },
  {
    title: "Confetti Animation",
    description:
      "Hint above the letter that it appears twice or more in the hidden word",
    isChecked: false,
  },
  {
    title: "Swap Buttons",
    description: 'Swap "Enter" and "Backspace" buttons',
    isChecked: false,
  },
];

const options = getDefaultOptions();
export const titles = options.map((o) => o.title);
