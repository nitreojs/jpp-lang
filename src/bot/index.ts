import { VK, MessageContext } from 'vk-io';
import { SessionManager } from '@vk-io/session';
import { HearManager } from '@vk-io/hear';
import { stripIndents } from 'common-tags';
import { inspect } from 'util';

import * as config from './config';
import * as JPP from '../lang';

const allowedGroups: string[] = [
  'tokens', 'statements'
];

const vk = new VK({ token: config.TOKEN });
const sessionManager = new SessionManager();
const hearManager = new HearManager<MessageContext>();

vk.updates.use(sessionManager.middleware);

vk.updates.use((context, next) => {
  for (const group of allowedGroups) {
    if (!(group in context.session)) {
      context.session[group] = false;
    }
  }

  return next();
});

vk.updates.use(hearManager.middleware);

hearManager.hear(/^\.\/(?<group>enable|disable)(?:\s+(?<type>.+)|$)$/i, (context) => {
  const { group, type: rawType } = context.$match.groups!;
  const changeTo: boolean = /enable/i.test(group) ? true : false;

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

hearManager.hear(/^\.\/tokenize(?:\s+(?<code>.+)|$)/is, (context) => {
  const { code } = context.$match.groups!;

  if (!code) {
    return context.reply('Code is not specified');
  }

  try {
    const lexer = new JPP.Lexer(code);
    const tokens = lexer.tokenize();
    const parser = new JPP.Parser(tokens);
    const statements = parser.parse();

    const resultIfTokens = stripIndents`
      [Tokens]
      ${tokens.map(token => token.toString()).join('\n')}
    `;

    const resultIfStatements = stripIndents`
      [Statements]
      ${statements.map(statement => inspect(statement)).join('\n')}
    `;

    const result = stripIndents`
      [Source]
      ${code}

      ${context.session.tokens ? resultIfTokens : ''}

      ${context.session.statements ? resultIfStatements : ''}
    `;

    return context.reply(result);
  } catch (error) {
    return context.reply(error.message);
  }
});

vk.updates.start().then(() => console.log('Started polling'));
