import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { TokenType } from '../../types';
import { getTokenChar } from '../../utils/helpers';
import { BoolValue, NullValue, NumberValue, StringValue, TypeValue, Value } from '../../variables/values';

export class ConditionalExpression extends Expression {
  constructor(
    public left: Expression,
    public operator: TokenType,
    public right: Expression
  ) {
    super();
  }

  public eval(): Value {
    const leftVal: Value = this.left.eval();
    const rightVal: Value = this.right.eval();

    if (leftVal instanceof TypeValue) {
      switch (this.operator) {
        case TokenType.EQEQ:
          return new BoolValue(rightVal instanceof TypeValue && leftVal._type === rightVal._type);
        case TokenType.EXCLEQ:
          return new BoolValue(!(rightVal instanceof TypeValue) || leftVal._type !== rightVal._type);
        case TokenType.LT:
        case TokenType.LTEQ:
        case TokenType.GT:
        case TokenType.GTEQ:
          return new BoolValue(false);
        case TokenType.BARBAR:
        case TokenType.OR:
          return leftVal;
        case TokenType.AMPAMP:
        case TokenType.AND:
          return new BoolValue(false);
      }
    }

    if (leftVal instanceof NullValue) {
      switch (this.operator) {
        case TokenType.EQEQ:
        case TokenType.AMPAMP:
        case TokenType.AND:
          return new BoolValue(rightVal instanceof NullValue);
        case TokenType.EXCLEQ:
          return new BoolValue(!(rightVal instanceof NullValue));
        case TokenType.BARBAR:
        case TokenType.OR:
          return new NullValue();
        case TokenType.LT:
        case TokenType.LTEQ:
        case TokenType.GT:
        case TokenType.GTEQ:
        default:
          return new BoolValue(false);
      }
    }

    if (leftVal instanceof StringValue) {
      switch (this.operator) {
        case TokenType.EQEQ:
          return new BoolValue(rightVal instanceof StringValue && leftVal.asString() === rightVal.asString());
        case TokenType.EXCLEQ:
          return new BoolValue(!(rightVal instanceof StringValue) || leftVal.asString() !== rightVal.asString());
        case TokenType.LT:
        case TokenType.LTEQ:
        case TokenType.GT:
        case TokenType.GTEQ:
          return new BoolValue(false);
        case TokenType.BARBAR:
        case TokenType.OR:
          return leftVal.asString() === '' ? rightVal : leftVal;
        case TokenType.AMPAMP:
        case TokenType.AND:
          return new BoolValue(leftVal.asString() !== '' && rightVal.asString() !== '');
      }
    }

    if (leftVal instanceof NumberValue) {
      switch (this.operator) {
        case TokenType.EQEQ:
          return new BoolValue(rightVal instanceof NumberValue && leftVal.asNumber() === rightVal.asNumber());
        case TokenType.EXCLEQ:
          return new BoolValue(!(rightVal instanceof NumberValue) || leftVal.asNumber() !== rightVal.asNumber());
        case TokenType.LT:
          return new BoolValue(leftVal.asNumber() < rightVal.asNumber());
        case TokenType.LTEQ:
          return new BoolValue(leftVal.asNumber() <= rightVal.asNumber());
        case TokenType.GT:
          return new BoolValue(leftVal.asNumber() > rightVal.asNumber());
        case TokenType.GTEQ:
          return new BoolValue(leftVal.asNumber() >= rightVal.asNumber());
        case TokenType.BARBAR:
        case TokenType.OR:
          return leftVal.asNumber() === 0 ? rightVal : leftVal;
        case TokenType.AMPAMP:
        case TokenType.AND:
          return new BoolValue(leftVal.asNumber() !== 0 && rightVal.asNumber() !== 0);
      }
    }

    if (leftVal instanceof BoolValue) {
      switch (this.operator) {
        case TokenType.EQEQ:
          return new BoolValue(rightVal instanceof BoolValue && leftVal.asBool() === rightVal.asBool());
        case TokenType.EXCLEQ:
          return new BoolValue(!(rightVal instanceof BoolValue) || leftVal.asBool() !== rightVal.asBool());
        case TokenType.LT:
          return new BoolValue(leftVal.asBool() < rightVal.asBool());
        case TokenType.LTEQ:
          return new BoolValue(leftVal.asBool() <= rightVal.asBool());
        case TokenType.GT:
          return new BoolValue(leftVal.asBool() > rightVal.asBool());
        case TokenType.GTEQ:
          return new BoolValue(leftVal.asBool() >= rightVal.asBool());
        case TokenType.BARBAR:
        case TokenType.OR:
          return leftVal.asBool() ? leftVal : rightVal;
        case TokenType.AMPAMP:
        case TokenType.AND:
          return new BoolValue(leftVal.asBool() && rightVal.asBool());
      }
    }

    return new BoolValue(false);
  }

  public toString(): string {
    return `${this.left.toString()} ${getTokenChar(this.operator)} ${this.right.toString()}`;
  }
}

inspectable(ConditionalExpression, {
  stringify(expression: ConditionalExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
