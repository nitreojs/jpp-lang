import { Token } from '../lexer/token';
import { TokenType } from '../types';
import { isLiteral } from '../utils/helpers';
import { StringValue, Value } from '../variables';

import { ObjectExpression, BinaryExpression, Expression, BoolExpression, ParenthesisExpression, StringExpression, UnaryExpression, VariableExpression, NumberExpression, NullExpression, PercentExpression, ConditionalExpression, BlockExpression, IfExpression, AssignmentExpression, ArrayExpression, TypeExpression, DeleteExpression } from './expressions';
import { MapExpression } from './expressions/literals/map-expression';

export class Parser {
  private static EOF = new Token({ type: TokenType.EOF });

  private position: number = 0;

  constructor(private tokens: Token[]) { }

  public parse(): BlockExpression {
    const statement: BlockExpression = new BlockExpression();

    while (!this.match(TokenType.EOF)) {
      const innerExpression = this.logicalOr();

      if (innerExpression) {
        statement.add(innerExpression);
      }
    }

    return statement;
  }

  

  private logicalOr(): Expression {
    let expression: Expression = this.logicalAnd();

    const logicalOrOperators: TokenType[] = [
      TokenType.BARBAR,
      TokenType.OR
    ];

    while (true) {
      for (const operator of logicalOrOperators) {
        if (this.match(operator)) {
          expression = new ConditionalExpression(expression, operator, this.logicalAnd());

          continue;
        }
      }

      break;
    }

    return expression;
  }

  private logicalAnd(): Expression {
    let expression: Expression = this.equality();

    const logicalAndOperators: TokenType[] = [
      TokenType.AMPAMP,
      TokenType.AND
    ];

    while (true) {
      for (const operator of logicalAndOperators) {
        if (this.match(operator)) {
          expression = new ConditionalExpression(expression, operator, this.equality());

          continue;
        }
      }

      break;
    }

    return expression;
  }

  private equality(): Expression {
    let expression: Expression = this.blockOrExpression();

    const equalityOperators: TokenType[] = [
      TokenType.EQEQ,
      TokenType.EXCLEQ
    ];

    while (true) {
      for (const operator of equalityOperators) {
        if (this.match(operator)) {
          expression = new ConditionalExpression(expression, operator, this.blockOrExpression());

          continue;
        }
      }

      break;
    }

    return expression;
  }

  private blockOrExpression(): Expression {
    if (this.lookMatch(TokenType.LBRACE)) {
      return this.block();
    }

    if (this.match(TokenType.IF)) {
      return this.ifElse()!;
    }

    if (this.match(TokenType.TYPE)) {
      return new TypeExpression(this.blockOrExpression());
    }

    if (this.match(TokenType.DELETE)) {
      return new DeleteExpression(this.blockOrExpression());
    }

    return this.assignmentExpression()!;
  }

  private block(): Expression {
    const block: BlockExpression = new BlockExpression();

    this.consume(TokenType.LBRACE);

    while (!this.match(TokenType.RBRACE)) {
      const innerExpression = this.blockOrExpression();

      if (innerExpression) {
        block.add(innerExpression);
      }
    }

    return block;
  }

  private array(): Expression {
    const array: ArrayExpression = new ArrayExpression();

    this.consume(TokenType.LBRACKET);

    while (!this.match(TokenType.RBRACKET)) {
      if (this.lookMatch(TokenType.COMMA)) {
        throw new SyntaxError('expected block or expression, got comma');
      }

      const innerExpression = this.blockOrExpression();

      if (innerExpression) {
        array.add(innerExpression.eval());
      }

      this.match(TokenType.COMMA);
    }

    return array;
  }

  private objectPair(callback: (values: [Value, Value]) => any): void {
    this.consume(TokenType.LBRACE);
    
    while (!this.match(TokenType.RBRACE)) {
      let key: Value | undefined;

      if (this.match(TokenType.LBRACKET)) {
        const expression = this.blockOrExpression();

        if (!(expression instanceof VariableExpression)) {
          throw new SyntaxError('expected key to be variable reference');
        }

        // key = new StringValue(expression.name);
        key = new StringValue(expression.eval().asString());

        this.consume(TokenType.RBRACKET);
      } else {
        const expression = this.blockOrExpression();

        if (expression instanceof VariableExpression) {
          key = new StringValue(expression.name);
        } else if (isLiteral(this.get(-1).type)) {
          key = new StringValue(expression.toString());
        } else if (!(expression instanceof StringExpression)) {
          throw new SyntaxError('expected key to be string or variable reference');
        } else {
          key = expression.eval();
        }
      }
      
      if (this.lookMatch(TokenType.COLON)) {
        this.consume(TokenType.COLON);
      } else if (this.lookMatch(TokenType.EQ)) {
        this.consume(TokenType.EQ);
      } else if (this.lookMatch(TokenType.IS)) {
        this.consume(TokenType.IS);
      } else if (this.lookMatch(TokenType.QUESTION)) {
        this.consume(TokenType.QUESTION);
      }

      const value: Value = this.blockOrExpression().eval();

      callback([key, value]);

      this.match(TokenType.COMMA);
    }
  }

  private map(): Expression {
    const map: MapExpression = new MapExpression();

    this.consume(TokenType.MAP);

    this.objectPair(values => map.add(values));

    return map;
  }

  private object(): Expression {
    const object: ObjectExpression = new ObjectExpression();

    this.consume(TokenType.OBJECT);

    this.objectPair(values => object.add(values));

    return object;
  }

  private assignmentExpression(): Expression | null {
    const current: Token = this.get();

    // let/const identifier [colon identifier/literal] [eq/is] expression
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

      let type: Expression | undefined;

      if (this.match(TokenType.COLON)) {
        if (!this.lookMatch(TokenType.IDENTIFIER) && !isLiteral(this.get().type)) {
          throw new SyntaxError('expected identifier or literal');
        }

        try {
          type = this.primary();
        } catch (error) {
          throw new SyntaxError('expected identifier or literal');
        }
      }

      if (this.match(TokenType.EQ) || this.match(TokenType.IS)) {
        const expression: Expression = this.blockOrExpression();

        this.match(TokenType.SEMICOLON);

        return new AssignmentExpression({ isConstant, variable: name, expression, type });
      }

      this.match(TokenType.SEMICOLON);

      return new AssignmentExpression({ isConstant, variable: name, type });
    }

    if (this.match(TokenType.SEMICOLON)) {
      return null;
    }

    return this.expression();
  }

  private ifElse(): Expression {
    const condition: Expression = this.blockOrExpression();

    const ifExpression: Expression = this.blockOrExpression()!;
    let elseExpression: Expression | undefined;

    if (this.match(TokenType.ELSE)) {
      elseExpression = this.blockOrExpression()!;
    }

    return new IfExpression(condition, ifExpression, elseExpression);
  }

  private expression(): Expression {
    while (this.match(TokenType.SEMICOLON));

    const expression: Expression = this.conditional();

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

    if (this.match(TokenType.TRUE) || this.match(TokenType.YES) || this.match(TokenType.CREWMATE)) {
      return new BoolExpression(true, this.get(-1).type);
    }

    if (this.match(TokenType.FALSE) || this.match(TokenType.NO) || this.match(TokenType.IMPOSTER)) {
      return new BoolExpression(false, this.get(-1).type);
    }

    if (this.match(TokenType.MAYBE) || this.match(TokenType.SUS)) {
      return new BoolExpression(Math.random() > 0.5, this.get(-1).type);
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

    if (this.lookMatch(TokenType.LBRACKET)) {
      return this.array();
    }

    if (this.lookMatch(TokenType.OBJECT)) {
      return this.object();
    }

    if (this.lookMatch(TokenType.MAP)) {
      return this.map();
    }

    this.match(TokenType.SEMICOLON);

    throw new SyntaxError(`unexpected token '${current.type}'`);
  }


  private consume(type: TokenType): Token {
    const current: Token = this.get();

    if (current.type !== type) {
      throw new SyntaxError(`expected token '${type}', got '${current.type}'`);
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
