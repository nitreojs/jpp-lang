import { readFileSync } from 'fs';

import { Lexer } from './lexer/lexer';
import { Parser } from './parser/parser';

const path: string = `${__dirname}/../../test.j++`;
const source: string = readFileSync(path).toString();

console.log('[Source]');
console.log(source);
console.log();

const tokens = new Lexer(source).tokenize();

console.log('[Tokens]');

for (const token of tokens) {
  console.log(token);
}

console.log();

const statements = new Parser(tokens).parse();

console.log('[Statements]');

for (const statement of statements) {
  console.log(statement);
  statement.execute();
}

console.log();
