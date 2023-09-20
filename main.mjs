import {Lexer} from "./lexer.mjs";
import {Parser} from "./parser.mjs";
import { evaluate } from "./eval.mjs";

/*
function repl() {
    const lexer = new Lexer();
    // Continue Repl Until User Stops Or Types `exit`
    while (true) {
      const input = prompt("> ");
      // Check for no user input or exit keyword.
      if (!input || input.includes("exit")) {
        Deno.exit(1);
      }
      const tokens = lexer.tokenize();
      const parser = new Parser(tokens);
  
      const program = parser.parse(input);
      console.log(program);
  
      //const result = evaluate(program);
      //console.log(result);
    }
};

repl()
*/

const lexer = new Lexer();

const tokens = lexer.tokenize("(5+4)-2 + 3");

console.log(tokens);

const parser = new Parser(tokens);

const ast = parser.parse()

let result = evaluate(ast);



console.log("a",ast);

console.log(result);