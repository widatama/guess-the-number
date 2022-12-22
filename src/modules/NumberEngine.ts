const DEFAULT_NUMBER_LENGTH = 4;
const AVAILABLE_NUMBER_LENGTH = [4, 5, 6, 7, 8];

export type NumberToGuess = {
  raw: string;
  structured: { [key: string]: number };
};

function isValidNumber(numberInput: string) {
  // check valid type
  if (Number.isNaN(parseInt(numberInput, 10))) {
    return false;
  }
  if (Number.isNaN(numberInput)) {
    return false;
  }
  if (numberInput.toString().length < 1) {
    return false;
  }

  const numberSet = new Set(numberInput.toString());

  // each digit has to be unique
  if (numberSet.size !== numberInput.toString().length) {
    return false;
  }

  return true;
}

function randomNumberBetweenInterval(min = 0, max = 9) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomNumber(numberLengthInput = 1) {
  const numberArr = [];
  const numberStructure: { [key: string]: number } = {};
  const outputNumber: NumberToGuess = { raw: '', structured: {} };
  let numberCount = 0;

  while (numberArr.length < numberLengthInput) {
    const randomNumber = randomNumberBetweenInterval();

    if (numberStructure[randomNumber] === undefined) {
      numberArr.push(randomNumber);
      numberStructure[randomNumber.toString()] = numberCount;

      numberCount += 1;
    }
  }

  outputNumber.raw = numberArr.join('');
  outputNumber.structured = numberStructure;

  return outputNumber;
}

function structurizeNumber(numberInput: string) {
  const structuredNumber: { [key: string]: number } = {};

  for (let idx = 0; idx < numberInput.length; idx += 1) {
    structuredNumber[numberInput[idx]] = idx;
  }

  return structuredNumber;
}

class NumberEngine {
  numberToGuess: NumberToGuess;

  numberLength: number;

  constructor() {
    this.numberToGuess = { raw: '', structured: {} };
    this.numberLength = DEFAULT_NUMBER_LENGTH;
  }

  generateNumber(numberLengthInput = DEFAULT_NUMBER_LENGTH) {
    this.numberLength = numberLengthInput;

    this.numberToGuess = generateRandomNumber(this.numberLength);

    return true;
  }

  setNumber(numberInput = '') {
    if (!isValidNumber(numberInput)) {
      throw new Error('Number input is not valid');
    }

    const numberInputToProcess = numberInput.toString();

    this.numberLength = numberInputToProcess.length;
    this.numberToGuess.raw = numberInputToProcess;
    this.numberToGuess.structured = structurizeNumber(numberInputToProcess);

    return true;
  }

  guessNumber(guessInput = '') {
    if (!this.numberToGuess.raw) {
      throw new Error('Number has not been generated');
    } else if (!isValidNumber(guessInput)) {
      throw new Error('Guess input is not valid');
    }

    const inputToProcess = guessInput.toString();

    if (inputToProcess.length !== this.numberLength) {
      throw new Error('Guess input is not valid');
    }

    let correctNumber = 0;
    let correctPosition = 0;

    for (let idx = 0; idx < inputToProcess.length; idx += 1) {
      const guessing = this.numberToGuess.structured[inputToProcess[idx]];

      if (typeof guessing !== 'undefined') {
        correctNumber += 1;
      }

      if (guessing === idx) {
        correctPosition += 1;
      }
    }

    return {
      numberLength: this.numberLength,
      correctNumber,
      correctPosition,
    };
  }

  static availableNumberLength() {
    return AVAILABLE_NUMBER_LENGTH;
  }
}

export default NumberEngine;
