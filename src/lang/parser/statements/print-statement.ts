import { inspectable } from 'inspectable';

import { Statement } from './statement';

import { Expression } from '../expressions';

export class PrintStatement extends Statement {
  constructor(public expression: Expression) {
    super();
  }

  public execute(): void {
    console.log(this.expression.eval());
  }

  public toString(): string {
    return `print ${this.expression.toString()}`;
  }
}

inspectable(PrintStatement, {
  stringify(statement: PrintStatement, payload, context) {
    return `${context.stylize(statement.constructor.name, 'special')}(${context.stylize(statement.toString(), 'string')})`;
  }
});
