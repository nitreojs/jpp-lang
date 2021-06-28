import { inspectable } from 'inspectable';

import { Statement } from './statement';

export class BlockStatement extends Statement {
  constructor(public statements: Statement[] = []) {
    super();
  }

  public add(statement: Statement): void {
    this.statements.push(statement);
  }

  public execute(): void {
    for (const statement of this.statements) {
      statement.execute();
    }
  }

  public toString(): string {
    return this.statements.length ? `<${this.statements.length} statements>` : '';
  }
}

inspectable(BlockStatement, {
  stringify(statement: BlockStatement, payload, context) {
    return `${context.stylize(statement.constructor.name, 'special')}(${context.stylize(statement.toString(), 'string')})`;
  },

  serialize(statement: BlockStatement) {
    return { statements: statement.statements };
  }
});
