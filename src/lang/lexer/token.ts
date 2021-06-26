import { inspectable } from 'inspectable';

import * as Types from '../types';
import * as Utils from '../utils/helpers';

export class Token {
  constructor(private options: Types.TokenOptions) { }

  public get type(): Types.TokenType {
    return this.options.type;
  }

  public get value(): string | undefined {
    return this.options.value;
  }

  public get position(): number | undefined {
    return this.options.position;
  }

  public get line(): number | undefined {
    return this.options.line;
  }

  public toString(): string {
    const value: string = this.value ? `(${this.value})` : '';
    const position: string = this.position ? `:${this.line}` : '';
    const line: string = this.line ? `:${this.line}` : '';

    return this.type + value + position + line;
  }
}

inspectable(Token, {
  stringify(token: Token, payload, context) {
    return `${context.stylize(token.constructor.name, 'special')} <${context.stylize(String(token), 'string')}> ${context.inspect(payload)}`;
  },

  serialize(token: Token) {
    return Utils.filterPayload({
      type: token.type,
      value: token.value,
      line: token.line,
      position: token.position
    });
  }
});
