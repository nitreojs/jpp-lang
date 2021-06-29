import { Value } from './variables/values';

export enum TokenType {
  IDENTIFIER = 'identifier',
  NUMBER = 'number',
  NULL = 'null',
  OBJECT = 'object',
  STRING = 'string',
  AS = 'as',

  NUMBER_T = 'number_t',
  STRING_T = 'string',
  BOOL_T = 'bool_t',
  NULL_T = 'null_t',
  VOID_T = 'void_t',
  OBJECT_T = 'object_t',
  ARRAY_T = 'array_t',
  UNKNOWN_T = 'unknown_t',

  PRINT = 'print',
  TYPE = 'type',
  IF = 'if',
  ELSE = 'else',
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
