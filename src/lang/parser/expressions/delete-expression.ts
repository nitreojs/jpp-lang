import { inspectable } from 'inspectable';

import { Expression } from './expression';
import { NullValue, Value } from '../../variables/values';
import { VariableExpression } from './variable-expression';
import { Variables } from '../../variables';
import { InternalError } from '../../errors';

export class DeleteExpression extends Expression {
  constructor(private expression: Expression) {
    super();
  }

  public eval(): Value {
    if (!(this.expression instanceof VariableExpression)) {
      throw new SyntaxError('expected variable');
    }

    if (!Variables.exists(this.expression.name)) {
      return new NullValue();
    }

    if (Variables.isInternal(this.expression.name)) {
      throw new InternalError('unable to delete internal variable');
    }

    return Variables.remove(this.expression.name);
  }

  public toString(): string {
    return `delete ${this.expression.toString()}`;
  }
}

inspectable(DeleteExpression, {
  stringify(expression: DeleteExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
