import {Lexer} from "./lexer.mjs";
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

startRepl();


