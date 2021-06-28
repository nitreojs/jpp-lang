import { Variable } from './variable';

import { VariableOptions } from '../types';
import { NumberValue, Value } from './values';
import { VariableNotDefinedError } from '../errors';

export class Variables {
  public static variables: Variable[] = [
    new Variable({ internal: true, name: '$PI', value: new NumberValue(Math.PI) }),
    new Variable({ internal: true, name: '$E', value: new NumberValue(Math.E) }),
    new Variable({ internal: true, name: '$JPP', value: new NumberValue(69) })
  ];

  public static exists(name: string): boolean {
    return Variables.variables.find(variable => variable.name === name) !== undefined;
  }

  public static get(name: string): Value {
    return Variables.variables.find(variable => variable.name === name)?.value ?? new NumberValue(0);
  }

  public static isInternal(name: string) {
    if (!Variables.exists(name)) {
      throw new VariableNotDefinedError(name);
    }

    const variable: Variable = this.variables.find(
      variable => variable.name === name
    )!;

    return variable.internal;
  }

  public static add(options: VariableOptions) {
    this.variables.push(new Variable(options));
  }

  public static remove(name: string): Value {
    if (!Variables.exists(name)) {
      throw new VariableNotDefinedError(name);
    }

    const index: number = Variables.variables.findIndex(variable => variable.name === name);
    const value: Value = Variables.get(name);

    Variables.variables.splice(index, 1);

    return value;
  }
}
