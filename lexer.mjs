import { Token, TokenType, lookup_token_type } from './tokens.mjs';

export class Lexer {
  #stream = '';
  #cursor = 0;

  #at() {
    return this.#stream[this.#cursor];
  }

  #peek(n = 1) {
    return this.#stream[this.#cursor + n];
  }

  tokenize(input = "") {
    this.#stream = input;
    this.#cursor = 0;

    const tokens = [];

    while (this.#cursor < this.#stream.length) {
      switch (this.#at()) {
        case " ":
          break;
        case "+":
          tokens.push(new Token(TokenType.PLUS, this.#at()));
          break;
        case "*":
          tokens.push(new Token(TokenType.MULTIPLICATION, this.#at()));
          break;
        case "-":
          tokens.push(new Token(TokenType.MINUS, this.#at()));
          break;
        case "/":
          tokens.push(new Token(TokenType.DIVISION, this.#at()));
          break;
        case "(":
          tokens.push(new Token(TokenType.LPAREN, this.#at()));
          break;
        case ")":
          tokens.push(new Token(TokenType.RPAREN, this.#at()));
          break;
        case ">":
          if (this.#peek() == "=") {
            tokens.push(new Token(TokenType.GTE, ">="));
            this.#cursor++;
          } else {
            tokens.push(new Token(TokenType.GT, this.#at()));
          }
          break;
        case "<":
          if (this.#peek() == "=") {
            tokens.push(new Token(TokenType.LTE, "<="));
            this.#cursor++;
          } else {
            tokens.push(new Token(TokenType.LT, this.#at()));
          }
          break;
        case "=":
          if (this.#peek() == "=") {
            tokens.push(new Token(TokenType.EQ, "=="));
            this.#cursor++;
          } else {
            tokens.push(new Token(TokenType.ASSIGN));
          }
          break;
        case "!":
          if (this.#peek() == "=") {
            tokens.push(new Token(TokenType.NOT_EQ, "!="));
            this.#cursor++;
          } else {
            tokens.push(new Token(TokenType.NEGATION, this.#at()));
          }
          break;
        case "i":
          if (this.#stream.slice(this.#cursor, this.#cursor + 2) === "if") {
            tokens.push(new Token(TokenType.IF, "if"));
            this.#cursor++;
          } else if (this.#stream.slice(this.#cursor, this.#cursor + 4) === "int") {
            tokens.push(new Token(TokenType.INT, "int"));
            this.#cursor += 3;
          } else {
            tokens.push(this.readIdentifier());
            this.#cursor--;
          }
          break;
        case "e":
          if (this.#stream.slice(this.#cursor, this.#cursor + 4) === "else") {
            tokens.push(new Token(TokenType.ELSE, "else"));
            this.#cursor += 3;
          } else {
            tokens.push(this.readIdentifier());
            this.#cursor--;
          }
          break;
        default:
          if (this.isDigit(this.#at())) {
            tokens.push(this.readInteger());
            this.#cursor--;
          }
          break;
      }

      this.#cursor++;
    }
    tokens.push(new Token(TokenType.EOF, ""));
    return tokens;
  }

  isDigit(char) {
    return /[0-9]/.test(char);
  }

  readIdentifier() {
    let read = "";

    while (
      this.#cursor < this.#stream.length &&
      /[a-zA-Z0-9_]/.test(this.#at())
    ) {
      read += this.#at();
      this.#cursor++;
    }
    return new Token(TokenType.IDENTIFIER, read);
  }

  readInteger() {
    let read = "";

    while (this.#cursor < this.#stream.length && this.isDigit(this.#at())) {
      read += this.#at();
      this.#cursor++;
    }
    return new Token(TokenType.INTEGER, read);
  }
}
