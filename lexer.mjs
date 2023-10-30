import { log } from 'console';
import { Token, TokenType, lookup_token_type } from './tokens.mjs';

export class Lexer{
     
    #stream = '';
    #cursor = 0;

    #at () {
        return this.#stream[this.#cursor];
    }

    #peek (n =1){
        return this.#stream[this.#cursor +n];
    }

    tokenize(input = ""){
        this.#stream = input;
        this.#cursor = 0;

        const tokens = [];

        while(this.#cursor < this.#stream.length){
            switch (this.#at()){
                case " ":
                    break;
                //case "\n":
                //case "\t":
                case "+":
                    tokens.push(new Token(TokenType.PLUS,this.#at()));
                    break;
                case "*":
                    tokens.push(new Token(TokenType.MULTIPLICATION,this.#at()));
                    break;
                case "-":
                    tokens.push(new Token(TokenType.MINUS,this.#at()));
                    break;
                case "/":
                    tokens.push(new Token(TokenType.DIVISION,this.#at()));
                    break;
                case "(":
                    tokens.push(new Token(TokenType.LPAREN,this.#at()));
                    break;
                case ")":
                    tokens.push(new Token(TokenType.RPAREN,this.#at()));
                    break;
                case ">":
                    if (this.#peek() == "="){
                        tokens.push(new Token(TokenType.GTE,">="));
                        this.#cursor ++;
                    } else {
                        tokens.push(new Token(TokenType.GT,this.#at()));
                    }
                    break;
                case "<":
                    if (this.#peek() == "="){
                        tokens.push(new Token(TokenType.LTE,"<="));
                        this.#cursor ++;
                    } else {
                        tokens.push(new Token(TokenType.LT,this.#at()));
                    }
                    break;
                case "=":
                    if (this.#peek() == "="){
                        tokens.push(new Token(TokenType.EQ,"=="));
                        this.#cursor ++;
                    } else {
                        tokens.push(new Token(TokenType.ASSIGN));
                    }
                    break;
                case "!":
                    if (this.#peek() == "="){
                        tokens.push(new Token(TokenType.NOT_EQ,"=="));
                        this.#cursor ++;
                    } else {
                        tokens.push(new Token(TokenType.NEGATION, this.#at()));
                    }
                    break;
                case '"':
                    this.#cursor++;
                    let read = ""
                    while(this.#at() !== '"') {
                        read += this.#at();
                        this.#cursor++
                    }
                    tokens.push(new Token(TokenType.STRING, read))
                default:
                    if (this.isDigit(this.#at())){
                        tokens.push(this.readInteger());
                        this.#cursor--;
                    }
                    break;
            }

            this.#cursor ++;
        }
        tokens.push(new Token(TokenType.EOF,""));
        return tokens;
    }

    isDigit(char) {
        return /[0-9]/.test(char);
      }

    readInteger() {
        let read = "";

        while(this.#cursor < this.#stream.length && this.isDigit(this.#at())) {
            read += this.#at();
            this.#cursor++
        }
        return new Token(TokenType.INTEGER,read);
    }
    
}

