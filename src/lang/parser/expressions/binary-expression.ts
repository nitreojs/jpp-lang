import { inspectable } from 'inspectable';

import { Expression } from './expression';

import { TokenType } from '../../types';
import { getTokenChar } from '../../utils/helpers';
import { ArrayValue, BoolValue, NullValue, NumberValue, StringValue, Value } from '../../variables/values';
import { BinaryExpressionError, ZeroDivisionError } from '../../errors';

export class BinaryExpression extends Expression {
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

    if (leftVal instanceof NullValue) {
      throw new BinaryExpressionError(`unknown operator '${this.operator}' for null`);
    }

    if (leftVal instanceof BoolValue) {
      throw new BinaryExpressionError(`unknown operator '${this.operator}' for bool`);
    }

    if (leftVal instanceof StringValue) {
      if (!(rightVal instanceof StringValue)) {
        throw new BinaryExpressionError('expected right side to be string');
      }

      if (this.operator === TokenType.PLUS) {
        return new StringValue(leftVal.asString() + rightVal.asString());
      }

      throw new BinaryExpressionError(`unknown operator '${this.operator}' for string`);
    }

    if (leftVal instanceof NumberValue) {
      if (!(rightVal instanceof NumberValue)) {
        throw new BinaryExpressionError('expected right side to be number');
      }

      const left: number = leftVal.asNumber();
      const right: number = rightVal.asNumber();

      if (this.operator === TokenType.PLUS) {
        return new NumberValue(left + right);
      }
  
      if (this.operator === TokenType.MINUS) {
        return new NumberValue(left - right);
      }
  
      if (this.operator === TokenType.ASTERISK) {
        return new NumberValue(left * right);
      }
  
      if (this.operator === TokenType.SLASH) {
        if (right === 0) {
          throw new ZeroDivisionError();
        }

        return new NumberValue(left / right);
      }
    }

    if (leftVal instanceof ArrayValue) {  
      if (this.operator === TokenType.ASTERISK) {
        if (!(rightVal instanceof NumberValue)) {
          throw new BinaryExpressionError('expected right side to be number');
        }

        const times: number = rightVal.asNumber();

        if (times < 0) {
          throw new BinaryExpressionError('expected right side to be number >= 0');
        }

        return new ArrayValue(Array(times).fill(leftVal.values).flat());
      }

      if (!(rightVal instanceof ArrayValue)) {
        throw new BinaryExpressionError('expected right side to be array');
      }

      if (this.operator === TokenType.PLUS) {
        return new ArrayValue([...leftVal.values, ...rightVal.values]);
      }

      throw new BinaryExpressionError(`unknown operator '${this.operator}' for array`);
    }

    throw new BinaryExpressionError(`unknown operator '${this.operator}' for ${leftVal.type}`);
  }

  public toString(): string {
    return `${this.left.toString()} ${getTokenChar(this.operator)} ${this.right.toString()}`;
  }
}

inspectable(BinaryExpression, {
  stringify(expression: BinaryExpression, payload, context) {
    return `${context.stylize(expression.constructor.name, 'special')}(${expression.toString()})`;
  }
});
