import { TokenType } from '../types';

export const TOKENS: Partial<Record<TokenType, string>> = {
  [TokenType.PLUS]: '+',
  [TokenType.MINUS]: '-',
  [TokenType.ASTERISK]: '*',
  [TokenType.SLASH]: '/',
  [TokenType.LPAREN]: '(',
  [TokenType.RPAREN]: ')',
  [TokenType.LET]: 'let',
  [TokenType.CONST]: 'const',
  [TokenType.TYPE]: 'type',
  [TokenType.IF]: 'if',
  [TokenType.ELSE]: 'else',
  [TokenType.OBJECT]: 'object',
  [TokenType.MAP]: 'map',
  [TokenType.DELETE]: 'delete',
  [TokenType.IS]: 'is',
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
  [TokenType.QUESTION]: '?'
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
  ['maybe', TokenType.MAYBE],
  ['crewmate', TokenType.CREWMATE],
  ['imposter', TokenType.IMPOSTER],
  ['sus', TokenType.SUS],
  ['null', TokenType.NULL],
  ['if', TokenType.IF],
  ['else', TokenType.ELSE],
  ['or', TokenType.OR],
  ['and', TokenType.AND],
  ['object', TokenType.OBJECT],
  ['map', TokenType.MAP],
  ['delete', TokenType.DELETE],
  ['is', TokenType.IS]
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
  ['?', TokenType.QUESTION]
]);
