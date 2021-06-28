import { Variable } from './variable';

import { VariableOptions } from '../types';
import { NumberValue, Value } from './values';

export class Variables {
  public static variables: Variable[] = [
    new Variable({ internal: true, name: 'PI', value: new NumberValue(Math.PI) }),
    new Variable({ internal: true, name: 'E', value: new NumberValue(Math.E) }),
    new Variable({ internal: true, name: 'JPP', value: new NumberValue(69) })
  ];

  public static exists(name: string): boolean {
    return Variables.variables.find(variable => variable.name === name) !== undefined;
  }

  public static get(name: string): Value {
    return Variables.variables.find(variable => variable.name === name)?.value ?? new NumberValue(0);
  }

  public static add(options: VariableOptions) {
    this.variables.push(new Variable(options));
  }
}
