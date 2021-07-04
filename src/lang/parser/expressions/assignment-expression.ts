import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { NullExpression } from './null-expression';

import { NullValue, Value } from '../../variables/values';
import { Variable, Variables } from '../../variables';
import { AssignmentError } from '../../errors';

interface AssignmentExpressionParams {
  isConstant: boolean;
  variable: string;
  expression?: Expression;
  type?: Expression;
}

export class AssignmentExpression extends Expression {
  public isConstant: boolean;
  public variable: string;
  public expression: Expression = new NullExpression();
  public type?: Expression;

  constructor(params: AssignmentExpressionParams) {
    super();

    this.isConstant = params.isConstant;
    this.variable = params.variable;

    if (params.expression) {
      this.expression = params.expression;
    }

    if (params.type) {
      this.type = params.type;
    }
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
    const declarator: string = this.isConstant ? 'const' : 'let';
    const type: string = this.type ? ` : ${this.type.toString()}` : ''; /// TODO: infer type

    return `${declarator} ${this.variable}${type} = ${this.expression.toString()}`;
  }
}

inspectable(AssignmentExpression, {
  stringify(expression: AssignmentExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
