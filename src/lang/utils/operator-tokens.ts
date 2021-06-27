import { TokenType } from '../types';

type char = string;

export const chars: char[] = ['+', '-', '*', '/', '(', ')', '{', '}', '[', ']', '=', ':', ';', ',', '%', '.'];

export const tokens: TokenType[] = [
  TokenType.PLUS,
  TokenType.MINUS,
  TokenType.ASTERISK,
  TokenType.SLASH,
  TokenType.LPAREN,
  TokenType.RPAREN,
  TokenType.LBRACE,
  TokenType.RBRACE,
  TokenType.LBRACKET,
  TokenType.RBRACKET,
  TokenType.EQ,
  TokenType.COLON,
  TokenType.SEMICOLON,
  TokenType.COMMA,
  TokenType.PERCENT,
  TokenType.DOT,
];

export const operators: Partial<Record<TokenType, string>> = {
  [TokenType.PLUS]: '+',
  [TokenType.MINUS]: '-',
  [TokenType.ASTERISK]: '*',
  [TokenType.SLASH]: '/',
  [TokenType.LPAREN]: '(',
  [TokenType.RPAREN]: ')',
  [TokenType.LBRACE]: '{',
  [TokenType.RBRACE]: '}',
  [TokenType.LBRACKET]: '[',
  [TokenType.RBRACKET]: ']',
  [TokenType.EQ]: '=',
  [TokenType.COLON]: ':',
  [TokenType.SEMICOLON]: ';',
  [TokenType.COMMA]: ',',
  [TokenType.PERCENT]: '%',
  [TokenType.DOT]: '.',
};
