import { inspectable } from 'inspectable';

import { Expression } from '../expression';
import { NullValue, Value } from '../../../variables/values';

export class NullExpression extends Expression {
  constructor() {
    super();
  }

  public eval(): Value {
    return new NullValue();
  }

  public toString(): string {
    return 'null';
  }
}

inspectable(NullExpression, {
  stringify(expression: NullExpression, payload, context) {
    return context.stylize(expression.constructor.name, 'special');
  }
});
