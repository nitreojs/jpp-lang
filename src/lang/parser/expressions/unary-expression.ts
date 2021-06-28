import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { TokenType } from '../../types';
import { getTokenChar } from '../../utils/helpers';
import { NumberValue, Value } from '../../variables/values';

export class UnaryExpression extends Expression {
  constructor(
    public operator: TokenType,
    public expression: Expression
  ) {
    super();
  }

  public eval(): Value {
    const value: number = this.expression.eval().asNumber();

    if (this.operator === TokenType.MINUS) {
      return new NumberValue(-value);
    }
    
    if (this.operator === TokenType.PLUS) {
      return new NumberValue(value);
    }

    return new NumberValue(0);
  }

  public toString(): string {
    return `${getTokenChar(this.operator)}${this.expression.toString()}`;
  }
}

inspectable(UnaryExpression, {
  stringify(expression: UnaryExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
