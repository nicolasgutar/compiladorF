/*import {Lexer} from "./lexer.mjs";
import {Parser} from "./parser.mjs";
import { evaluate } from "./eval.mjs";
import readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> ',
});

function startRepl() {
  rl.question('line>>> ', (source) => {
    if (source == 'salir()'){
      return;
    } else {
      const lexer = new Lexer();
      const tokens = lexer.tokenize(source);
      console.log(tokens);
      const parser = new Parser(tokens);
      const ast = parser.parse();
      console.log(ast);
      let result = evaluate(ast);
      console.log(result);
      startRepl();
    }
  });
}

startRepl();*/
import { Lexer } from "./lexer.mjs";
import { Parser } from "./parser.mjs";
import { evaluate } from "./eval.mjs";
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> ',
});

// Crear una tabla de símbolos para almacenar variables
const symbolTable = {};

function startRepl() {
  rl.question('line>>> ', (source) => {
    if (source === 'salir()') {
      rl.close();
      return;
    } else {
      const lexer = new Lexer();
      const tokens = lexer.tokenize(source);

      const parser = new Parser(tokens, symbolTable); // Pasa la tabla de símbolos al parser
      const ast = parser.parse();

      // Evalúa el árbol de sintaxis abstracta con la tabla de símbolos
      const result = evaluate(ast, symbolTable);
      console.log(result);
      startRepl();
    }
  });
}

startRepl();


