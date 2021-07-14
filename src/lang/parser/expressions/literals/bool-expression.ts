import { inspectable } from 'inspectable';

import { Expression } from '../expression';
import { BoolValue, Value } from '../../../variables/values';
import { TokenType } from '../../../types';

export class BoolExpression extends Expression {
  constructor(private value: boolean, private token: TokenType) {
    super();
  }

  public eval(): Value {
    return new BoolValue(this.value);
  }

  public toString(): string {
    if (this.token === TokenType.MAYBE) {
      return 'maybe';
    }

    if (this.token === TokenType.SUS) {
      return 'sus';
    }

    if (this.token === TokenType.YES) {
      return 'yes';
    }

    if (this.token === TokenType.NO) {
      return 'no';
    }

    if (this.token === TokenType.CREWMATE) {
      return 'crewmate';
    }

    if (this.token === TokenType.IMPOSTER) {
      return 'imposter';
    }

    return this.value.toString();
  }
}

inspectable(BoolExpression, {
  stringify(expression: BoolExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
