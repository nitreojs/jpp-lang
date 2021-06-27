import { Value } from './variables/values';

export enum TokenType {
  NUMBER = 'number',
  IDENTIFIER = 'identifier',
  STRING = 'string',

  PRINT = 'print',
  TYPE = 'type',
  NULL = 'null',

  PLUS = 'plus',
  MINUS = 'minus',
  ASTERISK = 'asterisk',
  SLASH = 'slash',
  EQ = 'eq',
  SEMICOLON = 'semicolon',
  COLON = 'colon',
  COMMA = 'comma',
  LPAREN = 'lparen',
  RPAREN = 'rparen',
  LBRACE = 'lbrace',
  RBRACE = 'rbrace',
  LBRACKET = 'lbracket',
  RBRACKET = 'rbracket',
  PERCENT = 'percent',
  DOT = 'dot',

  TRUE = 'true',
  FALSE = 'false',
  YES = 'yes',
  NO = 'no',

  LET = 'let',
  CONST = 'const',

  EOF = 'eof'
}

export interface TokenOptions {
  type: TokenType;
  value?: string;
  position?: number;
  line?: number;
}

export interface VariableOptions {
  constant?: boolean;
  name: string;
  value: Value;
}
