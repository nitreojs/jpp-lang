import { Value } from './variables/values';

export enum TokenType {
  NUMBER = 'number',
  IDENTIFIER = 'identifier',
  STRING = 'string',

  PRINT = 'print',
  TYPE = 'type',
  NULL = 'null',
  IF = 'if',
  ELSE = 'else',
  OBJECT = 'object',
  DELETE = 'delete',

  PLUS = 'plus',
  MINUS = 'minus',
  ASTERISK = 'asterisk',
  SLASH = 'slash',
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
  DOTDOTDOT = 'dotdotdot',
  ARROW = 'arrow',

  EQ = 'eq',
  EXCLEQ = 'excleq',
  EQEQ = 'eqeq',
  PLUSEQ = 'pluseq',
  MINUSEQ = 'minuseq',
  LT = 'lessthan',
  LTEQ = 'lessthanequal',
  GT = 'greaterthan',
  GTEQ = 'greaterthanequal',
  BAR = 'bar',
  BARBAR = 'barbar',
  AND = 'and',
  AMP = 'amp',
  AMPAMP = 'ampamp',
  OR = 'or',

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
  internal?: boolean;
  constant?: boolean;
  name: string;
  value: Value;
}
