import { ArrayType, NumberType, StringType, VoidType, ObjectType, BoolType, Type, UnknownType, NullType } from '../types/';
import { TokenType } from '../types';

export const TOKENS: Partial<Record<TokenType, string>> = {
  [TokenType.PLUS]: '+',
  [TokenType.MINUS]: '-',
  [TokenType.ASTERISK]: '*',
  [TokenType.SLASH]: '/',
  [TokenType.LPAREN]: '(',
  [TokenType.RPAREN]: ')',
  // [TokenType.NUMBER_T]: 'number_t',
  [TokenType.NULL]: 'null',
  // [TokenType.NULL_T]: 'null_t',
  // [TokenType.ARRAY_T]: 'array_t',
  // [TokenType.BOOL_T]: 'bool_t',
  [TokenType.OBJECT]: 'object',
  [TokenType.AS]: 'as',
  // [TokenType.OBJECT_T]: 'object_t',
  // [TokenType.STRING_T]: 'string_t',
  // [TokenType.VOID_T]: 'void_t',
  // [TokenType.UNKNOWN_T]: 'unknown_t',
  [TokenType.LET]: 'let',
  [TokenType.CONST]: 'const',
  [TokenType.TYPE]: 'type',
  [TokenType.IF]: 'if',
  [TokenType.ELSE]: 'else',
  [TokenType.DELETE]: 'delete',
  [TokenType.COLON]: ':',
  [TokenType.SEMICOLON]: ';',
  [TokenType.COMMA]: ',',
  [TokenType.PERCENT]: '%',
  [TokenType.DOT]: '.',
  [TokenType.DOTDOTDOT]: '...',
  [TokenType.ARROW]: '->',
  [TokenType.EQ]: '=',
  [TokenType.EXCLEQ]: '!=',
  [TokenType.EQEQ]: '==',
  [TokenType.PLUSEQ]: '+=',
  [TokenType.MINUSEQ]: '-=',
  [TokenType.LT]: '<',
  [TokenType.LTEQ]: '<=',
  [TokenType.GT]: '>',
  [TokenType.GTEQ]: '>=',
  [TokenType.BAR]: '|',
  [TokenType.BARBAR]: '||',
  [TokenType.OR]: 'or',
  [TokenType.AMP]: '&',
  [TokenType.AMPAMP]: '&&',
  [TokenType.AND]: 'and',
};

export const IDENTIFIERS: [string, TokenType][] = [
  ['let', TokenType.LET],
  ['const', TokenType.CONST],
  ['print', TokenType.PRINT],
  ['type', TokenType.TYPE],
  ['true', TokenType.TRUE],
  ['false', TokenType.FALSE],
  ['yes', TokenType.YES],
  ['no', TokenType.NO],
  ['null', TokenType.NULL],
  ['if', TokenType.IF],
  ['else', TokenType.ELSE],
  ['or', TokenType.OR],
  ['and', TokenType.AND],
  ['object', TokenType.OBJECT],
  // ['object_t', TokenType.OBJECT_T],
  ['delete', TokenType.DELETE],
  ['as', TokenType.AS],
  // ['array_t', TokenType.ARRAY_T],
  // ['number_t', TokenType.NUMBER_T],
  // ['string_t', TokenType.STRING_T],
  // ['void_t', TokenType.VOID_T],
  // ['bool_t', TokenType.BOOL_T],
  // ['unknown_t', TokenType.UNKNOWN_T],
  // ['null_t', TokenType.NULL_T]
];

export const OPERATORS: Map<string, TokenType> = new Map([
  ['+', TokenType.PLUS],
  ['-', TokenType.MINUS],
  ['*', TokenType.ASTERISK],
  ['/', TokenType.SLASH],

  ['(', TokenType.LPAREN],
  [')', TokenType.RPAREN],
  ['[', TokenType.LBRACKET],
  [']', TokenType.RBRACKET],
  ['{', TokenType.LBRACE],
  ['}', TokenType.RBRACE],
  
  [':', TokenType.COLON],
  [';', TokenType.SEMICOLON],
  [',', TokenType.COMMA],
  ['%', TokenType.PERCENT],
  ['.', TokenType.DOT],
  ['...', TokenType.DOTDOTDOT],
  ['->', TokenType.ARROW],
  
  ['=', TokenType.EQ],
  ['!=', TokenType.EXCLEQ],
  ['==', TokenType.EQEQ],
  ['+=', TokenType.PLUSEQ],
  ['-=', TokenType.MINUSEQ],
  ['<', TokenType.LT],
  ['<=', TokenType.LTEQ],
  ['>', TokenType.GT],
  ['>=', TokenType.GTEQ],
  ['|', TokenType.BAR],
  ['||', TokenType.BARBAR],
  ['or', TokenType.OR],
  ['&', TokenType.AMP],
  ['&&', TokenType.AMPAMP],
  ['and', TokenType.AND],
]);

export const TYPES: Map<string, Type> = new Map([
  ['array', new ArrayType()],
  ['bool', new BoolType()],
  ['number', new NumberType()],
  ['object', new ObjectType()],
  ['string', new StringType()],
  ['void', new VoidType()],
  ['unknown', new UnknownType()],
  ['null', new NullType()]
]);
