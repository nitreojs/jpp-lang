import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { NullValue, Value } from '../../variables/values';

export class IfExpression extends Expression {
  constructor(
    public condition: Expression,
    public ifExpression: Expression,
    public elseExpression?: Expression
  ) {
    super();
  }

  public eval(): Value {
    const result: boolean = this.condition.eval().asBool();

    if (result) {
      return this.ifExpression.eval();
    }
    
    if (this.elseExpression) {
      return this.elseExpression.eval();
    }

    return new NullValue();
  }

  public toString(): string {
    return `if ${this.condition.toString()} ${this.ifExpression.toString()} ${this.elseExpression ? `else ${this.elseExpression.toString()}` : ''}`.trim();
  }
}

inspectable(IfExpression, {
  stringify(expression: IfExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
