import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { NullValue, Value } from '../../variables/values';

export class BlockExpression extends Expression {
  constructor(public expressions: Expression[] = []) {
    super();
  }

  public add(expression: Expression) {
    this.expressions.push(expression);
  }

  public eval(): Value {
    if (this.expressions.length === 0) {
      return new NullValue();
    }

    for (const expression of this.expressions.slice(0, -1)) {
      expression.eval();
    }

    return this.expressions[this.expressions.length - 1].eval();
  }

  public toString(): string {
    return this.expressions.length ? `<${this.expressions.length} expressions>` : '';
  }
}

inspectable(BlockExpression, {
  stringify(expression: BlockExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
