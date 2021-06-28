import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { NullExpression } from './null-expression';

import { NullValue, Value } from '../../variables/values';
import { Variable, Variables } from '../../variables';
import { AssignmentError } from '../../errors';

export class AssignmentExpression extends Expression {
  constructor(
    public isConstant: boolean,
    public variable: string,
    public expression: Expression = new NullExpression()
  ) {
    super();
  }

  public eval(): Value {
    const value = this.expression.eval();

    if (this.isConstant && value instanceof NullValue) {
      throw new TypeError('\'const\' variables must be defined');
    }

    if (Variables.exists(this.variable)) {
      throw new AssignmentError(`variable '${this.variable}' already exists`);
    }

    Variables.add(
      new Variable({
        constant: this.isConstant,
        name: this.variable,
        value
      })
    );

    return value;
  }

  public toString(): string {
    return `${this.isConstant ? 'const': 'let'} ${this.variable} = ${this.expression.toString()}`;
  }
}

inspectable(AssignmentExpression, {
  stringify(expression: AssignmentExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
