import { Token } from './token';

import * as Types from '../types';
import * as Utils from '../utils/helpers';

type char = string;

export class Lexer {
  private tokens: Token[] = [];
  private position: number = 0;

  constructor(private input: string) { }

  public tokenize(): Token[] {
    while (this.position < this.input.length) {
      const current: char = this.peek();
      const next: char = this.peek(1);

      if (current === '0' && next === 'x') {
        this.tokenizeHexNumber();
      } else if (current === '0' && next === 'b') {
        this.tokenizeBinaryNumber();
      } else if (current === '0' && next === 'o') {
        this.tokenizeOctalNumber();
      } else if (Utils.isNumber(current) || (current === '.' && Utils.isNumber(next))) {
        this.tokenizeNumber();
      } else if (Utils.isOperator(current)) {
        this.tokenizeOperator();
      } else if (Utils.isIdentifierStart(current)) {
        this.tokenizeIdentifier();
      } else if (current === '"' || current === "'") {
        this.tokenizeString(current);
      } else if (current === '#') {
        this.skipComment();
      } else {
        this.next();
      }
    }

    return this.tokens;
  }

  
  private tokenizeHexNumber(): void {
    let buffer: char[] = ['0', 'x'];
    this.next(); // 0
    this.next(); // x

    let current: char = this.peek();

    while (Utils.isHex(current)) {
      buffer.push(current);
      current = this.next();
    }

    this.addToken({
      type: Types.TokenType.NUMBER,
      value: buffer.join('')
    });
  }

  private tokenizeBinaryNumber(): void {
    let buffer: char[] = ['0', 'b'];
    this.next(); // 0
    this.next(); // b

    let current: char = this.peek();

    while (Utils.isNumber(current)) {
      if (!Utils.isBinary(current)) {
        throw new SyntaxError('binary numbers can only contain 0 or 1');
      }

      buffer.push(current);
      current = this.next();
    }

    this.addToken({
      type: Types.TokenType.NUMBER,
      value: buffer.join('')
    });
  }

  private tokenizeOctalNumber(): void {
    let buffer: char[] = ['0', 'o'];
    this.next(); // 0
    this.next(); // o

    let current: char = this.peek();

    while (Utils.isNumber(current)) {
      if (!Utils.isOctal(current)) {
        throw new SyntaxError('octal numbers can only contain digits from 0 to 7');
      }

      buffer.push(current);
      current = this.next();
    }

    this.addToken({
      type: Types.TokenType.NUMBER,
      value: buffer.join('')
    });
  }

  private tokenizeNumber(): void {
    let buffer: char[] = [];
    let current: char = this.peek();

    while (Utils.isNumber(current) || current === '.') {
      if (current === '.' && buffer.includes('.')) {
        throw new TypeError('unexpected dot');
      }

      buffer.push(current);

      current = this.next();
    }

    this.addToken({
      type: Types.TokenType.NUMBER,
      value: buffer.join('')
    });
  }

  private tokenizeOperator(): void {
    let current: char = this.peek();

    this.addToken({
      type: Utils.getOperator(current)
    });

    this.next();
  }

  private tokenizeIdentifier(): void {
    let buffer: char[] = [];
    let current: char = this.peek();

    while (Utils.isIdentifierSymbol(current)) {
      buffer.push(current);
      current = this.next();
    }

    let type: Types.TokenType = Types.TokenType.IDENTIFIER;
    let string: string = buffer.join('');

    if (Utils.isNewIdentifier(string)) {
      type = Utils.getNewIdentifier(string);
    }

    this.addToken({
      type,
      value: type === Types.TokenType.IDENTIFIER ? buffer.join('') : undefined
    });
  }

  private tokenizeString(quote: '"' | "'"): void {
    this.next(); // skip quote

    let buffer: char[] = [];
    let current: char = this.peek();

    while (current !== quote) {
      if (current === '\0') {
        throw new Error('unexpected end');
      }

      if (current === '\n') {
        throw new Error('expected token \'quote\', got \'eol\'');
      }

      if (current === '\\') {
        current = this.next();

        if (current === quote) {
          current = this.next();
          buffer.push(quote);
          continue;
        }
        
        if (current === 'n') {
          current = this.next();
          buffer.push('\n');
          continue;
        }
        
        if (current === 't') {
          current = this.next();
          buffer.push('\t');
          continue;
        }

        buffer.push('\\');
        continue;
      }

      buffer.push(current);
      current = this.next();
    }

    this.next(); // skip quote
    
    this.addToken({
      type: Types.TokenType.STRING,
      value: buffer.join('')
    });
  }

  private skipComment(): void {
    this.next(); // skipping comment
    
    let buffer: char[] = [];
    let current: char = this.peek();

    while (current !== '\n' && current !== '\0') {
      buffer.push(current);
      current = this.next();
    }
  }



  private next(by: number = 1): char {
    this.position += by;

    return this.peek();
  }

  private peek(relative: number = 0): char {
    const position: number = this.position + relative;

    if (position >= this.input.length) {
      return '\0';
    }

    return this.input.charAt(position);
  }

  private addToken(options: Types.TokenOptions): void {
    this.tokens.push(new Token(options));
  }
}
