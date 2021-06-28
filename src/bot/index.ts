import { VK, MessageContext } from 'vk-io';
import { SessionManager } from '@vk-io/session';
import { HearManager } from '@vk-io/hear';
import { stripIndents } from 'common-tags';
import { inspect } from 'util';

import * as config from './config';
import * as JPP from '../lang';
import { Variable } from '../lang';

const allowedGroups: string[] = [
  'tokens', 'expressions'
];

const vk = new VK({ token: config.TOKEN });
const sessionManager = new SessionManager();
const hearManager = new HearManager<MessageContext>();

vk.updates.use(sessionManager.middleware);

vk.updates.use((context, next) => {
  for (const group of allowedGroups) {
    if (!(group in context.session)) {
      context.session[group] = true;
    }
  }

  return next();
});

vk.updates.use(hearManager.middleware);

hearManager.hear(/^\.\/(?<group>enable|disable)(?:\s+(?<type>.+)|$)$/i, (context) => {
  const { group, type: rawType } = context.$match.groups!;
  const changeTo: boolean = /enable/i.test(group);

  if (!rawType) {
    return context.reply(stripIndents`
      You did not specify any group
      Valid groups: ${allowedGroups.map(group => `'${group}'`).join(', ')}
    `);
  }

  const types: string[] = rawType.toLowerCase().split(/\s*,\s*/);
  const result: string[] = [];

  for (const type of types) {
    if (!allowedGroups.includes(type)) {
      return context.reply(stripIndents`
        '${type}' is not a valid group
        Valid groups: ${allowedGroups.map(group => `'${group}'`).join(', ')}
      `);
    }

    context.session[type] = changeTo;

    result.push(`${type} ➞ ${String(changeTo)}`);
  }

  return context.reply(result.join('\n'));
});

hearManager.hear(/^\.\/settings$/i, (context) => {
  return context.reply(
    allowedGroups.map(group => `• ${group}: ${String(context.session[group])}`).join('\n')
  );
});

hearManager.hear(/^\.\/(?<command>parse|token?ize)(?<execute>\s+(--|—)execute)?(?:\s+(?<code>.+)|$)/is, async (context) => {
  const { code, command, execute } = context.$match.groups!;

  if (!code) {
    return context.reply(`Nothing to ${command}`);
  }

  try {
    const lexer = new JPP.Lexer(code);
    const tokens = lexer.tokenize();
    const parser = new JPP.Parser(tokens);
    const block = parser.parse();

    let output: string = '';

    if (execute) {
      const originalStdoutWrite = process.stdout.write.bind(process.stdout);

      // @ts-ignore
      process.stdout.write = (chunk, encoding, callback) => {
        if (typeof chunk === 'string') {
          output += chunk;
        }

        return originalStdoutWrite(chunk, encoding, callback);
      };

      block.eval();
    }

    output = output.trim()
      .replace(/\u001b\[[0-9;]+m/g, '')
      .replace(/\033\[[0-9;]*m/g, '');

    const resultIfOutput = stripIndents`
      [Output]
      ${output}
    `;

    const resultIfTokens = stripIndents`
      [Tokens]
      ${tokens.map(token => token.toString()).join('\n')}
    `;

    const resultIfExpressions = stripIndents`
      [Expressions]
      ${block.expressions.map(expression => inspect(expression)).join('\n')}
    `;

    const result = stripIndents`
      [Source]
      ${code.trim()}

      ${output ? resultIfOutput : ''}

      ${context.session.tokens && tokens.length !== 0 ? resultIfTokens : ''}

      ${context.session.expressions && block.expressions.length !== 0 ? resultIfExpressions : ''}
    `;

    return context.reply(result);
  } catch (error) {
    console.log(error);

    return context.reply(`Unexpected ${error.name}: ${error.message}`);
  }
});

hearManager.hear(/^\.\/variables$/i, (context) => {
  const internalVars: Variable[] = JPP.Variables.variables.filter(variable => variable.internal);
  const userDefinedVars: Variable[] = JPP.Variables.variables.filter(variable => !variable.internal);

  const internal: string = (
    internalVars
      .map(variable => `const ${variable.name} = ${variable.value.toString()};`)
      .join('\n')
  );

  const userDefined: string = (
    userDefinedVars
      .map(variable => `${variable.constant ? 'const' : 'let'} ${variable.name} = ${variable.value.toString()};`)
      .join('\n')
  );

  const userDefinedIfUserDefined = stripIndents`
    [User Defined]
    ${userDefined}
  `

  return context.reply(stripIndents`
    [Internal]
    ${internal}

    ${ userDefinedVars.length ? userDefinedIfUserDefined : '' }
  `);
});

hearManager.hear(/^\.\/variable(?:\s+(?<name>.+)|$)$/i, (context) => {
  const { name } = context.$match.groups!;

  if (!name) {
    return context.reply('Variable\'s name is not specified');
  }

  const variable = JPP.Variables.variables.find(variable => variable.name === name);

  if (!variable) {
    return context.reply(`Variable '${name}' is not defined`);
  }

  const declarator: string = variable.internal ? '(internal) const' : variable.constant ? 'const' : 'let';

  return context.reply(`${declarator} ${variable.name} = ${variable.value.toString()};`);
});

vk.updates.start().then(() => console.log('Started polling'));
