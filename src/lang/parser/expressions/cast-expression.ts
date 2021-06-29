import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { BoolValue, NullValue, NumberValue, StringValue, Value } from '../../variables/values';
import { Type } from '../../types/';
import { TokenType } from '../../types';

export class CastExpression extends Expression {
  constructor(private expression: Expression, private type: Type) {
    super();
  }

  public eval(): Value {
    const token: TokenType = this.type.token;
    const evaluated: Value = this.expression.eval();

    if (token === TokenType.NUMBER_T) {
      return new NumberValue(evaluated.asNumber());
    }

    if (token === TokenType.STRING_T) {
      return new StringValue(evaluated.asString());
    }

    if (token === TokenType.NULL_T) {
      return new NullValue();
    }

    if (token === TokenType.BOOL_T) {
      return new BoolValue(evaluated.asBool());
    }

    throw new SyntaxError(`cannot cast ${this.expression.toString()} as ${this.type.toString()}`);
  }

  public toString(): string {
    return `${this.expression.toString()} as ${this.type.toString()}`;
  }
}

inspectable(CastExpression, {
  stringify(expression: CastExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
