import { inspectable } from 'inspectable';

import { Statement } from './statement';

import { Expression } from '../expressions';
import { Variable, Variables } from '../../variables';

export class AssignmentStatement extends Statement {
  constructor(
    public isConstant: boolean,
    public variable: string,
    public expression: Expression
  ) {
    super();
  }

  public execute(): void {
    const value = this.expression.eval();

    Variables.add(
      new Variable({
        constant: this.isConstant,
        name: this.variable,
        value
      })
    );
  }

  public toString(): string {
    return `${this.isConstant ? 'const': 'let'} ${this.variable} = ${this.expression.toString()}`;
  }
}

inspectable(AssignmentStatement, {
  stringify(statement: AssignmentStatement, payload, context) {
    return `${context.stylize(statement.constructor.name, 'special')}(${context.stylize(statement.toString(), 'string')})`;
  },

  serialize(statement: AssignmentStatement) {
    return { expression: statement.expression };
  }
});

