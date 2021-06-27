import { TokenType } from '../types';

export const tokens: Partial<Record<TokenType, string>> = {
  [TokenType.PLUS]: '+',
  [TokenType.MINUS]: '-',
  [TokenType.ASTERISK]: '*',
  [TokenType.SLASH]: '/',
  [TokenType.LPAREN]: '(',
  [TokenType.RPAREN]: ')',
  [TokenType.EQ]: '=',
  [TokenType.LET]: 'let',
  [TokenType.CONST]: 'const',
  [TokenType.COLON]: ':',
  [TokenType.SEMICOLON]: ';',
  [TokenType.COMMA]: ',',
  [TokenType.PERCENT]: '%',
  [TokenType.DOT]: '.',
};

export const identifiers: [string, TokenType][] = [
  ['let', TokenType.LET],
  ['const', TokenType.CONST],
  ['print', TokenType.PRINT],
  ['type', TokenType.TYPE],
  ['true', TokenType.TRUE],
  ['false', TokenType.FALSE],
  ['yes', TokenType.YES],
  ['no', TokenType.NO],
  ['null', TokenType.NULL]
];
