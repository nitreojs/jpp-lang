import { Token } from '../lexer/token';
import { TokenType } from '../types';

import { BinaryExpression, Expression, NumberExpression, ParenthesisExpression, StringExpression, UnaryExpression, VariableExpression } from './expressions';
import { AssignmentStatement, PrintStatement, Statement } from './statements';

export class Parser {
  private static EOF = new Token({ type: TokenType.EOF });

  private position: number = 0;

  constructor(private tokens: Token[]) { }

  public parse(): Statement[] {
    const statements: Statement[] = [];

    while (!this.match(TokenType.EOF)) {
      const statement = this.statement();

      if (statement) {
        statements.push(statement);
      }
    }

    return statements;
  }


  private statement(): Statement | null {
    if (this.match(TokenType.PRINT)) {
      return new PrintStatement(this.expression());
    }

    return this.assignmentStatement();
  }

  private assignmentStatement(): Statement | null {
    const current: Token = this.get();

    // let/const identifier [colon identifier] = expression
    if (
      (current.type === TokenType.LET || current.type === TokenType.CONST) &&
      this.get(1).type === TokenType.IDENTIFIER
    ) {
      let isConstant: boolean = false;

      if (current.type === TokenType.LET) {
        this.consume(TokenType.LET);
      } else {
        isConstant = true;
        this.consume(TokenType.CONST);
      }

      const name: string = this.get().value!;

      this.consume(TokenType.IDENTIFIER);
      this.consume(TokenType.EQ);

      return new AssignmentStatement(isConstant, name, this.expression());
    }

    this.expression();

    return null;
  }

  private expression(): Expression {
    const expression: Expression = this.additive();

    this.match(TokenType.SEMICOLON);

    return expression;
  }

  private additive(): Expression {
    let expression: Expression = this.multiplicative();

    while (true) {
      if (this.match(TokenType.PLUS)) {
        expression = new BinaryExpression(expression, TokenType.PLUS, this.multiplicative());

        continue;
      }
  
      if (this.match(TokenType.MINUS)) {
        expression = new BinaryExpression(expression, TokenType.MINUS, this.multiplicative());

        continue;
      }

      break;
    }

    return expression;
  }

  private multiplicative(): Expression {
    let expression: Expression = this.unary();

    while (true) {
      if (this.match(TokenType.ASTERISK)) {
        expression = new BinaryExpression(expression, TokenType.ASTERISK, this.unary());

        continue;
      }
  
      if (this.match(TokenType.SLASH)) {
        expression = new BinaryExpression(expression, TokenType.SLASH, this.unary());

        continue;
      }

      break;
    }

    return expression;
  }

  private unary(): Expression {
    if (this.match(TokenType.MINUS)) {
      return new UnaryExpression(TokenType.MINUS, this.unary());
    }

    if (this.match(TokenType.PLUS)) {
      return new UnaryExpression(TokenType.PLUS, this.unary());
    }

    return this.primary();
  }

  private primary(): Expression {
    const current: Token = this.get();

    if (this.match(TokenType.NUMBER)) {
      let value: number = Number.parseFloat(current.value!);

      if (current.value!.startsWith('0x')) {
        value = Number.parseInt(current.value!);
      }

      if (current.value!.startsWith('0b')) {
        value = Number.parseInt(current.value!.slice(2), 2);
      }

      if (current.value!.startsWith('0o')) {
        value = Number.parseInt(current.value!.slice(2), 8);
      }

      return new NumberExpression(value);
    }

    if (this.match(TokenType.IDENTIFIER)) {
      return new VariableExpression(current.value!);
    }

    if (this.match(TokenType.STRING)) {
      return new StringExpression(current.value!);
    }

    if (this.match(TokenType.LPAREN)) {
      const expression: Expression = new ParenthesisExpression(this.expression());

      this.match(TokenType.RPAREN);

      return expression;
    }

    throw new Error(`Unknown expression type: ${current.type}`);
  }


  private consume(type: TokenType): Token {
    const current: Token = this.get();

    if (current.type !== type) {
      throw new TypeError(`token ${current.type} does not match ${type}`);
    }

    this.position += 1;

    return current;
  }

  private match(type: TokenType): boolean {
    const current: Token = this.get();

    if (current.type !== type) {
      return false;
    }

    this.position += 1;

    return true;
  }

  private get(relative: number = 0): Token {
    const position: number = this.position + relative;

    if (position >= this.tokens.length) {
      return Parser.EOF;
    }

    return this.tokens[position];
  }
}
