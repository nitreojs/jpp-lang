import { inspectable } from 'inspectable';

import { Statement } from './statement';

import { Expression } from '../expressions';

export class IfStatement extends Statement {
  constructor(
    public condition: Expression,
    public ifStatement: Statement,
    public elseStatement?: Statement
  ) {
    super();
  }

  public execute(): void {
    const result: boolean = this.condition.eval().asBool();

    if (result) {
      this.ifStatement.execute();
    } else if (this.elseStatement) {
      this.elseStatement.execute();
    }
  }

  public toString(): string {
    return `if ${this.condition.toString()} ${this.ifStatement.toString()} ${this.elseStatement ? `else ${this.elseStatement.toString()}` : ''}`.trim();
  }
}

inspectable(IfStatement, {
  stringify(statement: IfStatement, payload, context) {
    return `${context.stylize(statement.constructor.name, 'special')}(${context.stylize(statement.toString(), 'string')})`;
  },

  serialize(statement: IfStatement) {
    return {
      condition: statement.condition
    };
  }
});
