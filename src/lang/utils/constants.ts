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
};
