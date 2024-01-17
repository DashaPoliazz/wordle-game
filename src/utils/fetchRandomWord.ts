const BASE_URL = "https://random-word-api.herokuapp.com/word";
const PARAMS = {
  LENGTH: "length",
};

export const fetchRandomWord = (wordLength: number): Promise<string> => {
  const url = new URL(BASE_URL);
  const params = url.searchParams;

  const stringifiedLength = wordLength.toString();

  params.set(PARAMS.LENGTH, stringifiedLength);

  const formattedUrl = url.toString();
  const response = fetch(formattedUrl)
    .then((response) => response.json())
    .then((words) => words[0]);

  return response;
};
