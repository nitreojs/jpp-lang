import { inspectable } from 'inspectable';

import { Rule } from './rule';

type char = string;

export class Range extends Rule {
  constructor(public from: char | number, public to: char | number) {
    super('range');
  }

  public get fromCode(): number {
    return this.from.toString().charCodeAt(0);
  }

  public get toCode(): number {
    return this.to.toString().charCodeAt(0);
  }

  public get range(): string[] {
    const array: string[] = [];

    for (let i = this.fromCode; i <= this.toCode; i++) {
      array.push(String.fromCharCode(i));
    }

    return array;
  }

  public toNotation(): string {
    return `"${this.from}" -> "${this.to}"`;
  }
}

inspectable(Range, {
  stringify(range: Range, payload, context) {
    return `${context.stylize(range.constructor.name, 'special')}(${context.stylize(range.toNotation(), 'string')})`;
  }
});
