import { TokenType } from '../types';

import { IDENTIFIERS, OPERATORS, TOKENS, TYPES } from './constants';

type char = string;

export const isPlainObject = (object: object): object is Record<string, any> => (
  Object.prototype.toString.call(object) === '[object Object]'
);

export const filterPayload = (payload: Record<string, any>): Record<string, any> => {
  const filteredPayload: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload)) {
    const notEmpty = value !== undefined && value !== null;

    const isEmptyArray = (
      Array.isArray(value)
      && value!.length === 0
    );

    if (notEmpty && !isEmptyArray) {
      if (isPlainObject(value)) {
        filteredPayload[key] = filterPayload(value);
      } else {
        filteredPayload[key] = value;
      }
    }
  }

  return filteredPayload;
};

export const isWhitespace = (source: char) => /[\s\n\t\r]/.test(source);
export const isNumber = (source: char) => !isWhitespace(source) && !Number.isNaN(+source);
export const isOperator = (source: char) => OPERATORS.has(source);
export const getOperator = (source: char) => OPERATORS.get(source);
export const getTokenChar = (source: TokenType) => TOKENS[source]!;
export const isHex = (source: char) => isNumber(source) || 'abcdef'.includes(source.toLowerCase());
export const isBinary = (source: char) => '01'.includes(source);
export const isOctal = (source: char) => '01234567'.includes(source);
export const isIdentifierStart = (source: char) => /[A-Za-zА-Яа-я_$]/i.test(source);
export const isIdentifierSymbol = (source: char) => /[A-Za-zА-Яа-я_$\d]/i.test(source);
export const isInteger = (source: number) => (source ^ 0) === source;
export const isNewIdentifier = (source: string) => IDENTIFIERS.find(([name]) => source === name) !== undefined;
export const getNewIdentifier = (source: string) => IDENTIFIERS.find(([name]) => source === name)![1];
export const getType = (source: string) => TYPES.get(source) ?? TYPES.get('unknown')!;
