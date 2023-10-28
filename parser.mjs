import { Token, TokenType } from './tokens.mjs';

export class Parser {
  #tokens = [];
  #cursor = 0;
  #symbolTable = {}; // Tabla de símbolos para almacenar variables

  constructor(tokens, symbolTable) {
    this.#tokens = tokens;
    this.#symbolTable = symbolTable;
  }

  #at() {
    return this.#tokens[this.#cursor];
  }

  #peek(n = 1) {
    return this.#tokens[this.#cursor + n];
  }

  #eatToken(tokenType) {
    if (tokenType == this.#at().type) this.#cursor++;
    else throw Error(`Expected a token to be of type: ${tokenType} instead received: ${this.#at().type}`);
  }

  parse() {
    return this.#parseStatement(); // Inicia el análisis con una declaración
  }

  #parseStatement() {
    if (this.#at().type === TokenType.IF) {
      return this.#parseIfStatement();
    } else if (this.#at().type === TokenType.INT) {
      return this.#parseVariableDeclaration();
    } else {
      return this.#parseExpression();
    }
  }

  #parseIfStatement() {
    this.#eatToken(TokenType.IF);
    this.#eatToken(TokenType.LPAREN);
    const condition = this.#parseExpression();
    this.#eatToken(TokenType.RPAREN);

    const ifBody = this.#parseStatement();

    if (this.#at().type === TokenType.ELSE) {
      this.#eatToken(TokenType.ELSE);
      const elseBody = this.#parseStatement();
      return {
        type: "IfStatement",
        condition,
        ifBody,
        elseBody,
      };
    } else {
      return {
        type: "IfStatement",
        condition,
        ifBody,
      };
    }
  }

  #parseVariableDeclaration() {
    this.#eatToken(TokenType.INT); // Suponemos que solo hay "int" por ahora
    const variableName = this.#at().literal;
    this.#eatToken(TokenType.IDENTIFIER);
    this.#eatToken(TokenType.ASSIGN);
    const initialValue = this.#parseExpression();
    this.#eatToken(TokenType.SEMICOLON); // Suponemos que las declaraciones terminan con punto y coma

    // Almacena la variable en la tabla de símbolos
    this.#symbolTable[variableName] = initialValue;

    return {
      type: "VariableDeclaration",
      variableName,
      initialValue,
    };
  }

  #parseExpression() {
    // Implementa el análisis de expresiones que utilizan variables
    let leftHandSide = this.#parseTerm();

    while (this.#at().type === TokenType.PLUS || this.#at().type === TokenType.MINUS) {
      const operator = this.#at().literal;
      const ttype = this.#at().type === TokenType.PLUS ? TokenType.PLUS : TokenType.MINUS;
      this.#eatToken(ttype);
      let rhs = this.#parseTerm();
      leftHandSide = { type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs };
    }

    return leftHandSide;
  }

  #parseTerm() {
    // Implementa el análisis de términos que utilizan variables
    let leftHandSide = this.#parseFactor();

    while (this.#at().type === TokenType.DIVISION || this.#at().type === TokenType.MULTIPLICATION) {
      const operator = this.#at().literal;
      const ttype = this.#at().type === TokenType.DIVISION ? TokenType.DIVISION : TokenType.MULTIPLICATION;
      this.#eatToken(ttype);
      let rhs = this.#parseFactor();
      leftHandSide = { type: "BinaryOperator", operator, leftHandSide, rightHandSide: rhs };
    }

    return leftHandSide;
  }

  #parseFactor() {
    if (this.#at().type === TokenType.INTEGER) {
      let literal = new Token(TokenType.NUMERICL, this.#at().literal);
      this.#eatToken(TokenType.INTEGER);
      return literal;
    }

    let expr;

    if (this.#at().type === TokenType.IDENTIFIER) {
      const variableName = this.#at().literal;
      this.#eatToken(TokenType.IDENTIFIER);
      if (this.#symbolTable.hasOwnProperty(variableName)) {
        // Si la variable existe en la tabla de símbolos, utiliza su valor
        return this.#symbolTable[variableName];
      } else {
        throw Error(`Variable '${variableName}' is not defined.`);
      }
    }

    if (this.#at().type === TokenType.LPAREN) {
      this.#eatToken(TokenType.LPAREN);
      expr = this.#parseExpression();
      this.#eatToken(TokenType.RPAREN);
      return expr;
    }

  }
}
