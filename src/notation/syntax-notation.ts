import { Literal, Or, Set, Rule, Identifier, Optional, Plus, Star, Definition, Range } from './rules';

import { Token } from '../lang/lexer/token';

const definitions: Map<string, Rule> = new Map();

export class SyntaxNotation {
  public static or(...args: ConstructorParameters<typeof Or>): Or {
    return new Or(...args);
  }

  public static literal(...args: ConstructorParameters<typeof Literal>): Literal {
    return new Literal(...args);
  }

  public static set(...args: ConstructorParameters<typeof Set>): Set {
    return new Set(...args);
  }

  public static identifier(...args: ConstructorParameters<typeof Identifier>): Identifier {
    return new Identifier(...args);
  }

  public static optional(...args: ConstructorParameters<typeof Optional>): Optional {
    return new Optional(...args);
  }

  public static plus(...args: ConstructorParameters<typeof Plus>): Plus {
    return new Plus(...args);
  }

  public static star(...args: ConstructorParameters<typeof Star>): Star {
    return new Star(...args);
  }

  public static define(...args: ConstructorParameters<typeof Definition>): Definition {
    const definition = new Definition(...args);

    if (!definitions.has(args[0])) {
      definitions.set(...args);
    }

    return definition;
  }

  public static range(...args: ConstructorParameters<typeof Range>): Range {
    return new Range(...args);
  }

  public static match(token: Token, rule: Rule): boolean {
    console.log('match', { token, rule });

    if (rule instanceof Identifier) {
      const definition = definitions.get(rule.name)!;

      return SyntaxNotation.match(token, definition);
    }

    if (rule instanceof Or) {
      const matches = rule.rules.some(orRule => SyntaxNotation.match(token, orRule));

      return matches;
    }

    if (rule instanceof Set) {
      const matches = rule.rules.every(setRule => SyntaxNotation.match(token, setRule));

      return matches;
    }

    if (rule instanceof Literal) {
      return token.value === rule.toString();
    }

    if (rule instanceof Plus) {
      /// TODO
    }

    return false;
  }

  public static matches(tokens: Token[], rule: Rule): boolean {
    if (rule instanceof Definition) {
      return SyntaxNotation.matches(tokens, rule.rule);
    }

    if (rule instanceof Set) {
      for (let i = 0; i < rule.rules.length; i++) {
        const tRule = rule.rules[i];
        const tToken = tokens[i];

        console.log({ i, rule: tRule, token: tToken });

        if (!SyntaxNotation.match(tToken, tRule)) {
          return false;
        }
      }

      return true;
    }

    return false;
  }


  /// RULES

  /** `digit-excluding-zero = "1" -> "9";` */
  public static DIGIT_EXCLUDING_ZERO = SyntaxNotation.define('digit-excluding-zero', SyntaxNotation.range(1, 9));

  /** `digit = ("0" | digit-excluding-zero);` */
  public static DIGIT = SyntaxNotation.define('digit', SyntaxNotation.or(
    SyntaxNotation.literal(0),
    SyntaxNotation.identifier('digit-excluding-zero')
  ));

  /** `char = ("A" -> "Z" | "a" -> "z");` */
  public static CHAR = SyntaxNotation.define('char', SyntaxNotation.or(
    SyntaxNotation.range('A', 'Z'),
    SyntaxNotation.range('a', 'z')
  ));

  /** `identifier = ((char | "_" | "$") (char | digit | "_" | "$")?)+;` */
  public static IDENTIFIER = SyntaxNotation.define('identifier', SyntaxNotation.plus(
    SyntaxNotation.or(
      SyntaxNotation.identifier('char'),
      SyntaxNotation.literal('_'),
      SyntaxNotation.literal('$')
    ),
    SyntaxNotation.optional(
      SyntaxNotation.or(
        SyntaxNotation.identifier('char'),
        SyntaxNotation.identifier('digit'),
        SyntaxNotation.literal('_'),
        SyntaxNotation.literal('$')
      )
    )
  ));

  /** `integer = "-"? digit+;` */
  public static INTEGER = SyntaxNotation.define('integer', SyntaxNotation.set(
    SyntaxNotation.optional(SyntaxNotation.literal('-')),
    SyntaxNotation.plus(SyntaxNotation.identifier('digit'))
  ));

  /** `float = (digit+ "." digit* | "." digit+) ("f" | "F")?;` */
  public static FLOAT = SyntaxNotation.define('float', SyntaxNotation.set(
    SyntaxNotation.or(
      SyntaxNotation.set(
        SyntaxNotation.plus(SyntaxNotation.identifier('digit')),
        SyntaxNotation.literal('.'),
        SyntaxNotation.star(SyntaxNotation.identifier('digit'))
      ),
      SyntaxNotation.set(
        SyntaxNotation.literal('.'),
        SyntaxNotation.plus(SyntaxNotation.identifier('digit'))
      )
    ),
    SyntaxNotation.optional(
      SyntaxNotation.or(
        SyntaxNotation.literal('f'),
        SyntaxNotation.literal('F')
      )
    )
  ));

  /** `number = (integer | float);` */
  public static NUMBER = SyntaxNotation.define('number', SyntaxNotation.or(
    SyntaxNotation.identifier('integer'),
    SyntaxNotation.identifier('float')
  ));

  /** `expression = (number);` */
  public static EXPRESSION = SyntaxNotation.define('expression', SyntaxNotation.or(
    SyntaxNotation.identifier('number')
  ));

  /** `operator = ("+" | "-" | "*" | "/");` */
  public static OPERATOR = SyntaxNotation.define('operator', SyntaxNotation.or(
    SyntaxNotation.literal('+'),
    SyntaxNotation.literal('-'),
    SyntaxNotation.literal('*'),
    SyntaxNotation.literal('/')
  ));

  /** `binary_op = expression operator expression;` */
  public static BINARY_OP = SyntaxNotation.define('binary_op', SyntaxNotation.set(
    SyntaxNotation.identifier('expression'),
    SyntaxNotation.identifier('operator'),
    SyntaxNotation.identifier('expression')
  ));

  /** `unary_op = operator expression;` */
  public static UNARY_OP = SyntaxNotation.define('unary_op', SyntaxNotation.set(
    SyntaxNotation.identifier('operator'),
    SyntaxNotation.identifier('expression')
  ));
}
