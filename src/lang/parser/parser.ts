import { Token } from '../lexer/token';
import { TokenType } from '../types';

import { BinaryExpression, Expression, BoolExpression, ParenthesisExpression, StringExpression, UnaryExpression, VariableExpression, NumberExpression, NullExpression, PercentExpression, ConditionalExpression } from './expressions';
import { BlockStatement, AssignmentStatement, IfStatement, PrintStatement, Statement } from './statements';

export class Parser {
  private static EOF = new Token({ type: TokenType.EOF });

  private position: number = 0;

  constructor(private tokens: Token[]) { }

  public parse(): BlockStatement {
    const statement: BlockStatement = new BlockStatement();

    while (!this.match(TokenType.EOF)) {
      const innerStatement = this.blockOrStatement();

      if (innerStatement) {
        statement.add(innerStatement);
      }
    }

    return statement;
  }

  
  private blockOrStatement(): Statement {
    if (this.lookMatch(TokenType.LBRACE)) {
      return this.block();
    }

    return this.statement()!;
  }

  private block(): Statement {
    const block: BlockStatement = new BlockStatement();

    this.consume(TokenType.LBRACE);

    while (!this.match(TokenType.RBRACE)) {
      const innerStatement = this.blockOrStatement();

      if (innerStatement) {
        block.add(innerStatement);
      }
    }

    return block;
  }

  private statement(): Statement | null {
    if (this.match(TokenType.PRINT)) {
      return new PrintStatement(this.expression());
    }

    if (this.match(TokenType.IF)) {
      return this.ifElse();
    }

    return this.assignmentStatement();
  }

  private assignmentStatement(): Statement | null {
    const current: Token = this.get();

    // let/const identifier [colon identifier] = expression
    if (current.type === TokenType.LET || current.type === TokenType.CONST) {
      let isConstant: boolean = false;

      if (current.type === TokenType.LET) {
        this.consume(TokenType.LET);
      } else {
        isConstant = true;
        this.consume(TokenType.CONST);
      }

      const name: string = this.get().value!;

      this.consume(TokenType.IDENTIFIER);

      this.match(TokenType.SEMICOLON);

      if (this.match(TokenType.EQ)) {
        const expression: Expression = this.expression();

        this.match(TokenType.SEMICOLON);

        return new AssignmentStatement(isConstant, name, expression);
      }

      return new AssignmentStatement(isConstant, name);
    }

    if (this.match(TokenType.SEMICOLON)) {
      return null;
    }

    this.expression();

    return null;
  }

  private ifElse(): Statement | null {
    const condition: Expression = this.expression();
    const ifStatement: Statement = this.blockOrStatement()!;
    let elseStatement: Statement | undefined;

    if (this.match(TokenType.ELSE)) {
      elseStatement = this.blockOrStatement()!;
    }

    return new IfStatement(condition, ifStatement, elseStatement);
  }

  private expression(): Expression {
    while (this.match(TokenType.SEMICOLON));

    const expression: Expression = this.logicalOr();

    this.match(TokenType.SEMICOLON);

    return expression;
  }

  private logicalOr(): Expression {
    let expression: Expression = this.logicalAnd();

    while (true) {
      if (this.match(TokenType.BARBAR)) {
        expression = new ConditionalExpression(expression, TokenType.BARBAR, this.logicalAnd());

        continue;
      }

      break;
    }

    return expression;
  }

  private logicalAnd(): Expression {
    let expression: Expression = this.equality();

    while (true) {
      if (this.match(TokenType.AMPAMP)) {
        expression = new ConditionalExpression(expression, TokenType.AMPAMP, this.logicalAnd());

        continue;
      }

      break;
    }

    return expression;
  }

  private equality(): Expression {
    const expression: Expression = this.conditional();

    if (this.match(TokenType.EQEQ)) {
      return new ConditionalExpression(expression, TokenType.EQEQ, this.conditional());
    }

    if (this.match(TokenType.EXCLEQ)) {
      return new ConditionalExpression(expression, TokenType.EXCLEQ, this.conditional());
    }

    return expression;
  }

  private conditional(): Expression {
    let expression: Expression = this.additive();

    const conditionalOperators: TokenType[] = [
      TokenType.LT,
      TokenType.LTEQ,
      TokenType.GT,
      TokenType.GTEQ
    ];

    while (true) {
      for (const operator of conditionalOperators) {
        if (this.match(operator)) {
          expression = new ConditionalExpression(expression, operator, this.additive());

          continue;
        }
      }

      break;
    }

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

    return this.postfix();
  }

  private postfix(): Expression {
    let expression: Expression = this.primary();

    while (true) {
      if (this.match(TokenType.PERCENT)) {
        expression = new PercentExpression(expression);

        continue;
      }

      break;
    }

    return expression;
  }

  private primary(): Expression {
    const current: Token = this.get();

    if (this.match(TokenType.NUMBER)) {
      let value: number = Number.parseFloat(current.value!);

      if (current.value!.startsWith('.')) {
        value = Number.parseFloat(`0${current.value}`);
      }

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

    if (this.match(TokenType.TRUE) || this.match(TokenType.YES)) {
      return new BoolExpression(true);
    }

    if (this.match(TokenType.FALSE) || this.match(TokenType.NO)) {
      return new BoolExpression(false);
    }

    if (this.match(TokenType.NULL)) {
      return new NullExpression();
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

    this.match(TokenType.SEMICOLON);

    throw new Error(`unknown expression type '${current.type}'`);
  }


  private consume(type: TokenType): Token {
    const current: Token = this.get();

    if (current.type !== type) {
      throw new TypeError(`expected token '${type}', got '${current.type}'`);
    }

    this.position += 1;

    return current;
  }

  private lookMatch(type: TokenType): boolean {
    const current: Token = this.get();

    if (current.type !== type) {
      return false;
    }

    return true;
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
